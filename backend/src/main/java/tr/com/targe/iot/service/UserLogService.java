package tr.com.targe.iot.service;

import org.springframework.stereotype.Service;
import tr.com.targe.iot.entity.UserLog;
import tr.com.targe.iot.entity.User;
import tr.com.targe.iot.repository.UserLogRepository;
import tr.com.targe.iot.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserLogService {

    private final UserLogRepository userLogRepository;
    private final UserRepository userRepository;

    public UserLogService(UserLogRepository userLogRepository, UserRepository userRepository) {
        this.userLogRepository = userLogRepository;
        this.userRepository = userRepository;
    }

    public List<UserLog> getAllUserLogs() {
        List<UserLog> logs = userLogRepository.findAll();
        
        return logs.stream().map(log -> {
            if (log.getUser() != null) {
                // User entity'sinden username'i al
                User user = userRepository.findById(log.getUser().getUserId()).orElse(null);
                if (user != null) {
                    log.setUsername(user.getUsername());
                }
            }
            return log;
        }).collect(Collectors.toList());
    }
}
