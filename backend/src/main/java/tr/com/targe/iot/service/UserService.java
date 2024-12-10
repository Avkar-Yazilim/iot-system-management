package tr.com.targe.iot.service;

import tr.com.targe.iot.entity.User;
import tr.com.targe.iot.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user, String firstName, String lastName, String userAuthorization) {

        user.setFirstName(firstName);    
        user.setLastName(lastName);     
        user.setCreateAt(LocalDateTime.now()); 
        user.setCreateBy(userAuthorization);   
    
        return userRepository.save(user);
    }
    

    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setUserAuthorization(updatedUser.getUserAuthorization());
            existingUser.setPasswordHash(updatedUser.getPasswordHash());
            existingUser.setUpdateAt(updatedUser.getUpdateAt());
            existingUser.setUpdateBy(updatedUser.getUpdateBy());
            return userRepository.save(existingUser);
        }).orElse(null);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
