package tr.com.targe.iot.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.targe.iot.DTO.DeviceDTO;
import tr.com.targe.iot.service.DeviceService;

import java.util.List;

@RestController
@RequestMapping("/api/devices")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class DeviceController {
    
    private final DeviceService deviceService;

    @GetMapping
    public ResponseEntity<List<DeviceDTO>> getAllDevices() {
        return ResponseEntity.ok(deviceService.getAllDevices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeviceDTO> getDeviceById(@PathVariable Long id) {
        DeviceDTO device = deviceService.getDeviceById(id);
        return ResponseEntity.ok(device);
    }

    @PostMapping
    public ResponseEntity<DeviceDTO> createDevice(@RequestBody DeviceDTO deviceDTO) {
        return new ResponseEntity<>(deviceService.createDevice(deviceDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeviceDTO> updateDevice(@PathVariable Long id, @RequestBody DeviceDTO deviceDTO) {
        return ResponseEntity.ok(deviceService.updateDevice(id, deviceDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id) {
        deviceService.deleteDevice(id);
        return ResponseEntity.noContent().build();
    }


    @PatchMapping("/{id}/status")
    public ResponseEntity<DeviceDTO> updateDeviceStatus(
            @PathVariable Long id, 
            @RequestBody String status) {
            return ResponseEntity.ok(deviceService.updateDeviceStatus(id, status));
    }
}
