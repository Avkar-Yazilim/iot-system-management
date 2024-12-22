package tr.com.targe.iot.controller;

import tr.com.targe.iot.service.SensorValuesService;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import tr.com.targe.iot.DTO.SensorValuesDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sensor-values")
@CrossOrigin(origins = "http://localhost:5173")
public class SensorValuesController {

    private final SensorValuesService sensorValuesService;

    // Tüm sensör değerlerini getir
    @GetMapping
    public List<SensorValuesDTO> getAllSensorValues() {
        return sensorValuesService.getAllSensorValues();
    }

    // Belirli bir cihazın tüm sensör verilerini getir
    @GetMapping("/device/{deviceId}")
    public List<SensorValuesDTO> getSensorValuesByDeviceId(@PathVariable Long deviceId) {
        return sensorValuesService.getSensorValuesByDeviceId(deviceId);
    }

    // Her cihaz için en son sensör verilerini getir
    @GetMapping("/latest")
    public List<SensorValuesDTO> getLatestValuesForAllDevices() {
        return sensorValuesService.getLatestValuesForAllDevices();
    }

    // Belirli bir cihazın en son sensör verilerini getir
    @GetMapping("/latest/device/{deviceId}")
    public List<SensorValuesDTO> getLatestValuesForDevice(@PathVariable Long deviceId) {
        return sensorValuesService.getLatestValuesForDevice(deviceId);
    }


    // Son N kayıt için cihaz bazlı sensör verilerini getir
    @GetMapping("/device/{deviceId}/last/{count}")
    public List<SensorValuesDTO> getLastNValuesByDevice(
        @PathVariable Long deviceId,
        @PathVariable int count) {
        return sensorValuesService.getLastNValuesByDevice(deviceId, count);
    }
}
