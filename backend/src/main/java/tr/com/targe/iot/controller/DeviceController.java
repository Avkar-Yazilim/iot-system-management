package tr.com.targe.iot.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import lombok.RequiredArgsConstructor;
import tr.com.targe.iot.DTO.DeviceDTO;
import tr.com.targe.iot.service.DeviceService;

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
    public ResponseEntity<?> createDevice(@RequestBody DeviceDTO deviceDTO) {
        try {
            System.out.println("Received DTO: " + deviceDTO);
            
            if (deviceDTO.getDeviceId() == null || deviceDTO.getDeviceName() == null || deviceDTO.getDeviceType() == null) {
                return ResponseEntity.badRequest()
                    .body("Device ID, name and type are required");
            }
            
            DeviceDTO createdDevice = deviceService.createDevice(deviceDTO);
            return ResponseEntity.ok(createdDevice);
            
        } catch (Exception e) {
            String errorMessage = "Error creating device: " + e.getMessage();
            System.err.println(errorMessage);
            System.err.println("Full error: " + e);
            
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(errorMessage);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDevice(@PathVariable Long id, @RequestBody DeviceDTO deviceDTO) {
        try {
            deviceDTO.setDeviceId(id);
            DeviceDTO updatedDevice = deviceService.updateDevice(id, deviceDTO);
            return ResponseEntity.ok(updatedDevice);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating device: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id, @RequestParam String username) {
        deviceService.deleteDevice(id, username);
        return ResponseEntity.ok().build();
    }


    @PatchMapping("/{id}/status")
    public ResponseEntity<DeviceDTO> updateDeviceStatus(
            @PathVariable Long id, 
            @RequestBody String status) {
            return ResponseEntity.ok(deviceService.updateDeviceStatus(id, status));
    }


    @GetMapping("/export/json")
    public ResponseEntity<?> exportDevicesToJSON(HttpServletResponse response) {
        try {
            List<DeviceDTO> devices = deviceService.getAllDevices();
            
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
            
            String jsonOutput = objectMapper.writeValueAsString(devices);
            
            response.setContentType("application/json;charset=UTF-8");
            response.setHeader("Content-Disposition", "attachment; filename=devices.json");
            response.getWriter().write(jsonOutput);
            
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                    "error", "JSON dışa aktarma hatası",
                    "message", e.getMessage(),
                    "cause", e.getCause() != null ? e.getCause().getMessage() : "Unknown cause"
                ));
        }
    }
}
