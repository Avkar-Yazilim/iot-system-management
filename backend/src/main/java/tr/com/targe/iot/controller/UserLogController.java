package tr.com.targe.iot.controller;

import tr.com.targe.iot.entity.UserLog;
import tr.com.targe.iot.service.UserLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user-log")
public class UserLogController {

    private final UserLogService userLogService;

    public UserLogController(UserLogService userLogService) {
        this.userLogService = userLogService;
    }

    @GetMapping
    public List<UserLog> getAllUserLogs() {
        return userLogService.getAllUserLogs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserLog> getUserLogById(@PathVariable Long id) {
        Optional<UserLog> userLog = userLogService.getUserLogById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserLog> createUserLog(@RequestBody UserLog userLog) {
        UserLog createdUserLog = userLogService.createUserLog(userLog);
        return ResponseEntity.status(201).body(createdUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserLog> updateUserLog(@PathVariable Long id, @RequestBody UserLog updatedUserLog) {
        UserLog userLog = userLogService.updateUserLog(id, updatedUserLog);
        if (userLog != null) {
            return ResponseEntity.ok(userLog);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserLog(@PathVariable Long id) {
        userLogService.deleteUserLog(id);
        return ResponseEntity.noContent().build();
    }
}
