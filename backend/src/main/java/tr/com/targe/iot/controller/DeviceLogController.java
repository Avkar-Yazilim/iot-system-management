package tr.com.targe.iot.controller;

import tr.com.targe.iot.DTO.DeviceLogDTO;
import tr.com.targe.iot.service.DeviceLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import java.util.List;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor 
public class DeviceLogController {

    private final DeviceLogService deviceLogService;

    @GetMapping
    public ResponseEntity<List<DeviceLogDTO>> getAllDeviceLogs() {
        List<DeviceLogDTO> deviceLogs = deviceLogService.getAllDeviceLogs();
        return ResponseEntity.ok(deviceLogs);
    }

    @GetMapping("/{deviceId}")
    public ResponseEntity<List<DeviceLogDTO>> getLogsByDevice(@PathVariable Long deviceId) {
        List<DeviceLogDTO> deviceLogs = deviceLogService.getLogsByDevice(deviceId);
        return ResponseEntity.ok(deviceLogs);
    }
}

