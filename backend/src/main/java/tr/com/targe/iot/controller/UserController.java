package tr.com.targe.iot.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import tr.com.targe.iot.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tr.com.targe.iot.DTO.GoogleUserRequest;
import tr.com.targe.iot.DTO.UserDTO;
import tr.com.targe.iot.entity.User;
import tr.com.targe.iot.mapper.UserMapper;
import tr.com.targe.iot.response.SuccessResponse;
import tr.com.targe.iot.service.OTPService;
import tr.com.targe.iot.service.UserService;
import tr.com.targe.iot.service.EmailService;


@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final EmailService emailService;
    @Autowired
    private OTPService otpService;


    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        User user = userService.createUser(userDTO); 
        return ResponseEntity.status(HttpStatus.CREATED).body(userMapper.toDTO(user)); 
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userService.updateUser(id, updatedUser);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build(); 
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build(); 
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO loginRequest) {
        try {
            UserDTO user = userService.login(loginRequest.getEmail(), loginRequest.getPasswordHash());
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleUserRequest googleUser) {
        try {
            log.info("Google login request received: {}", googleUser);
            UserDTO response = userService.handleGoogleLogin(googleUser);
            log.info("Google login successful for user: {}", response);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Google login failed: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Google login failed: " + e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        try {
            if (userService.existsByEmail(userDTO.getEmail())) {
                return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Bu email adresi zaten kayıtlı");
            }

            User newUser = userService.createUser(userDTO);
            return ResponseEntity.ok(userMapper.toDTO(newUser));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Kayıt işlemi başarısız: " + e.getMessage());
        }
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOTP(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            
            if (userService.existsByEmail(email)) {
                return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Bu email adresi zaten kayıtlı"));
            }
            
            otpService.createAndSendOTP(email);
            return ResponseEntity.ok().body(new SuccessResponse("Doğrulama kodu gönderildi"));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("OTP gönderilemedi: " + e.getMessage()));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String otp = request.get("otp");
            boolean isValid = otpService.verifyOTP(email, otp);
            
            if (isValid) {
                return ResponseEntity.ok().body(new SuccessResponse("OTP doğrulandı"));
            } else {
                return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Geçersiz doğrulama kodu"));
            }
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Doğrulama hatası: " + e.getMessage()));
        }
    }
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            log.info("Password reset requested for email: {}", email);
            
            // Email kontrolü
            if (!userService.existsByEmail(email)) {
                log.warn("Email not found: {}", email);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Bu email adresi ile kayıtlı kullanıcı bulunamadı"));
            }
            
            // Random 6 haneli şifre oluştur
            String newPassword = String.format("%06d", new Random().nextInt(999999));
            log.debug("Generated new password: {}", newPassword);
            
            // Kullanıcıyı bul
            User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
            
            try {
                // Önce plain password'ü kaydet
                user.setPasswordHash(newPassword);
                userRepository.save(user);
                log.debug("Plain password saved for user: {}", user.getUserId());
                
                // Sonra şifrele
                userRepository.saveEncryptedPassword(user.getUserId(), "mysecretkey");
                log.debug("Password encrypted for user: {}", user.getUserId());
                
                // Email gönder
                emailService.sendPasswordResetEmail(email, newPassword);
                log.info("Password reset email sent to: {}", email);
                
                return ResponseEntity.ok()
                    .body(Map.of("message", "Yeni şifreniz email adresinize gönderildi"));
                    
            } catch (Exception e) {
                log.error("Error during password reset process: ", e);
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "İşlem sırasında hata: " + e.getMessage()));
            }
            
        } catch (Exception e) {
            log.error("Unexpected error in reset password: ", e);
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Beklenmeyen hata: " + e.getMessage()));
        }
    }
}

@Data
class ErrorResponse {
    private String message;
    private LocalDateTime timestamp = LocalDateTime.now();

    public ErrorResponse(String message) {
        this.message = message;
    }
}
