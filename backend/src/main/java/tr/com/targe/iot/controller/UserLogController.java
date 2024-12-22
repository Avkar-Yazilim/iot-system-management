package tr.com.targe.iot.controller;

import tr.com.targe.iot.DTO.UserLogDTO;
import tr.com.targe.iot.service.UserLogService;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Collectors;

import tr.com.targe.iot.mapper.UserLogMapper;
import java.util.List;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user-log")
@CrossOrigin(origins = "http://localhost:5173")
public class UserLogController {

    private final UserLogService userLogService;
    private final UserLogMapper userLogMapper;

    @GetMapping
    public List<UserLogDTO> getAllUserLogs() {
        return userLogService.getAllUserLogs().stream()
            .map(userLogMapper::toDTO)
            .collect(Collectors.toList());
    }
}
