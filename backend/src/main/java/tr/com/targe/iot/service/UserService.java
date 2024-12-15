package tr.com.targe.iot.service;

import tr.com.targe.iot.DTO.UserDTO;
import tr.com.targe.iot.entity.User;
import tr.com.targe.iot.repository.UserRepository;
import tr.com.targe.iot.mapper.UserMapper;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;    

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(userMapper::toDTO).collect(Collectors.toList());
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
        userRepository.deleteById(id);
    }

}
