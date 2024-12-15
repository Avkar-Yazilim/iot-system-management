package tr.com.targe.iot.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tr.com.targe.iot.DTO.UserDTO;
import tr.com.targe.iot.entity.User;
import tr.com.targe.iot.mapper.UserMapper;
import tr.com.targe.iot.repository.UserRepository;
@Service
@RequiredArgsConstructor
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
        user.setCreateBy("admin");
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
        
        return userMapper.toDTO(user);
    }

}
