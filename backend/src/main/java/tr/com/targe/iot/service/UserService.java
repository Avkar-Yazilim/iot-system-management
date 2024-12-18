package tr.com.targe.iot.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tr.com.targe.iot.DTO.GoogleUserRequest;
import tr.com.targe.iot.DTO.UserDTO;
import tr.com.targe.iot.entity.User;
import tr.com.targe.iot.mapper.UserMapper;
import tr.com.targe.iot.repository.UserRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;    

    public List<UserDTO> getAllUsers() {
        return userRepository.findAllActive().stream().map(userMapper::toDTO).collect(Collectors.toList());
    }

    public UserDTO getUserById(Long id) {
        return userRepository.findById(id).map(userMapper::toDTO).orElse(null);
    }

    public User createUser(UserDTO userDTO) {
        User user = userMapper.toEntity(userDTO);
        user.setCreateAt(LocalDateTime.now());
        user.setCreateBy(userDTO.getCreateBy() != null ? userDTO.getCreateBy() : "system");
        user.setPasswordHash(userDTO.getPasswordHash());
        return userRepository.save(user);
    }
    
    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
            .map(existingUser -> {
                existingUser.setFirstName(updatedUser.getFirstName());
                existingUser.setLastName(updatedUser.getLastName());
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setPasswordHash(updatedUser.getPasswordHash());
                existingUser.setUserAuthorization(updatedUser.getUserAuthorization());
                existingUser.setUsername(updatedUser.getUsername());
                return userRepository.save(existingUser);
            })
            .orElse(null);  
    }

    public void deleteUser(Long id) {
         User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cihaz bulunamadı"));
                user.setDeleteBy("admin");
                user.setDeleteAt(LocalDateTime.now());
        userRepository.save(user);
    }

    public UserDTO login(String email, String password) {
        String cleanPassword = password.replace("\"", "");
        
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
        
        if (!user.getPasswordHash().equals(cleanPassword)) {
            throw new RuntimeException("Hatalı şifre");
        }
        
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        
        return userMapper.toDTO(user);
    }

    public UserDTO handleGoogleLogin(GoogleUserRequest googleUser) {
        try {
            Optional<User> existingUser = userRepository.findByEmail(googleUser.getEmail());
            
            if (existingUser.isPresent()) {
                User user = existingUser.get();
                user.setDeleteAt(null);
                user.setDeleteBy(null);
                user.setLastLogin(LocalDateTime.now());
                userRepository.save(user);
                return userMapper.toDTO(user);
            }

            String[] nameParts = googleUser.getDisplayName().split(" ");
            String firstName = nameParts[0];
            String lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
            
            User newUser = new User();
            newUser.setEmail(googleUser.getEmail());
            newUser.setUsername(googleUser.getDisplayName());
            newUser.setFirstName(firstName);
            newUser.setLastName(lastName);
            newUser.setUserAuthorization("user");
            newUser.setCreateAt(LocalDateTime.now());
            newUser.setCreateBy("system");
            newUser.setPasswordHash("GOOGLE_LOGIN");
            newUser.setLastLogin(LocalDateTime.now());
            
            User savedUser = userRepository.save(newUser);
            return userMapper.toDTO(savedUser);
            
        } catch (Exception e) {
            throw new RuntimeException("Google login işlemi başarısız: " + e.getMessage());
        }
    }

    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

}
