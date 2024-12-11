package tr.com.targe.iot.controller;

import tr.com.targe.iot.entity.DeviceLog;
import tr.com.targe.iot.service.DeviceLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/device-logs")
public class DeviceLogController {

    private final DeviceLogService deviceLogService;

    public DeviceLogController(DeviceLogService deviceLogService) {
        this.deviceLogService = deviceLogService;
    }

    @GetMapping
    public List<DeviceLog> getAllDeviceLogs() {
        return deviceLogService.getAllDeviceLogs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeviceLog> getDeviceLogById(@PathVariable Long id) {
        Optional<DeviceLog> deviceLog = deviceLogService.getDeviceLogById(id);
        return deviceLog.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DeviceLog> createDeviceLog(
            @RequestBody DeviceLog deviceLog,
            @RequestParam String createBy) {
        DeviceLog createdDeviceLog = deviceLogService.createDeviceLog(deviceLog, createBy);
        return ResponseEntity.status(201).body(createdDeviceLog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeviceLog> updateDeviceLog(@PathVariable Long id, @RequestBody DeviceLog updatedDeviceLog) {
        DeviceLog deviceLog = deviceLogService.updateDeviceLog(id, updatedDeviceLog);
        if (deviceLog != null) {
            return ResponseEntity.ok(deviceLog);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeviceLog(@PathVariable Long id) {
        deviceLogService.deleteDeviceLog(id);
        return ResponseEntity.noContent().build();
    }
}
