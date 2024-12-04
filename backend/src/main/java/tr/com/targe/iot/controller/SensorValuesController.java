package tr.com.targe.iot.controller;

import tr.com.targe.iot.entity.SensorValues;
import tr.com.targe.iot.service.SensorValuesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sensor-values")
public class SensorValuesController {

    private final SensorValuesService sensorValuesService;

    public SensorValuesController(SensorValuesService sensorValuesService) {
        this.sensorValuesService = sensorValuesService;
    }

    @GetMapping
    public List<SensorValues> getAllSensorValues() {
        return sensorValuesService.getAllSensorValues();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SensorValues> getSensorValueById(@PathVariable Long id) {
        Optional<SensorValues> sensorValue = sensorValuesService.getSensorValueById(id);
        return sensorValue.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SensorValues> createSensorValue(@RequestBody SensorValues sensorValues) {
        SensorValues createdSensorValue = sensorValuesService.createSensorValue(sensorValues);
        return ResponseEntity.status(201).body(createdSensorValue); 
    }

    @PutMapping("/{id}")
    public ResponseEntity<SensorValues> updateSensorValue(@PathVariable Long id, @RequestBody SensorValues updatedSensorValue) {
        SensorValues sensorValue = sensorValuesService.updateSensorValue(id, updatedSensorValue);
        if (sensorValue != null) {
            return ResponseEntity.ok(sensorValue);
        }
        return ResponseEntity.notFound().build(); 
    }

    // SensorValues kaydını sil
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSensorValue(@PathVariable Long id) {
        sensorValuesService.deleteSensorValue(id);
        return ResponseEntity.noContent().build();
    }
}
