package tr.com.targe.iot.controller;

import tr.com.targe.iot.entity.SensorValuePlan;
import tr.com.targe.iot.service.SensorValuePlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sensor-value-plans")
public class SensorValuePlanController {

    private final SensorValuePlanService sensorValuePlanService;

    public SensorValuePlanController(SensorValuePlanService sensorValuePlanService) {
        this.sensorValuePlanService = sensorValuePlanService;
    }

    @GetMapping
    public List<SensorValuePlan> getAllSensorValuePlans() {
        return sensorValuePlanService.getAllSensorValuePlans();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SensorValuePlan> getSensorValuePlanById(@PathVariable Long id) {
        Optional<SensorValuePlan> sensorValuePlan = sensorValuePlanService.getSensorValuePlanById(id);
        return sensorValuePlan.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SensorValuePlan> createSensorValuePlan(@RequestBody SensorValuePlan sensorValuePlan) {
        SensorValuePlan createdPlan = sensorValuePlanService.createSensorValuePlan(sensorValuePlan);
        return ResponseEntity.status(201).body(createdPlan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SensorValuePlan> updateSensorValuePlan(@PathVariable Long id, @RequestBody SensorValuePlan updatedPlan, @RequestHeader("updateBy") String updateBy) {
        SensorValuePlan plan = sensorValuePlanService.updateSensorValuePlan(id, updatedPlan, updateBy);
        if (plan != null) {
            return ResponseEntity.ok(plan);
        }
        return ResponseEntity.notFound().build(); 
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSensorValuePlan(@PathVariable Long id, @RequestHeader("deleteBy") String deleteBy) {
        sensorValuePlanService.deleteSensorValuePlan(id, deleteBy);
        return ResponseEntity.noContent().build(); 
    }
}
