package tr.com.targe.iot.service;

import org.springframework.stereotype.Service;
import tr.com.targe.iot.entity.UserLog;
import tr.com.targe.iot.repository.UserLogRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserLogService {

    private final UserLogRepository userLogRepository;

    public UserLogService(UserLogRepository userLogRepository) {
        this.userLogRepository = userLogRepository;
    }

    public List<UserLog> getAllUserLogs() {
        return userLogRepository.findAll();
    }

    public Optional<UserLog> getUserLogById(Long id) {
        return userLogRepository.findById(id);
    }

    public UserLog createUserLog(UserLog userLog) {
        return userLogRepository.save(userLog);
    }

    public UserLog updateUserLog(Long id, UserLog updatedUserLog) {
        return userLogRepository.findById(id).map(existingUserLog -> {
            existingUserLog.setAction(updatedUserLog.getAction());
            existingUserLog.setTimestamp(updatedUserLog.getTimestamp());
            existingUserLog.setUser(updatedUserLog.getUser());
            return userLogRepository.save(existingUserLog);
        }).orElse(null);
    }

    public void deleteUserLog(Long id) {
        userLogRepository.deleteById(id);
    }
}
