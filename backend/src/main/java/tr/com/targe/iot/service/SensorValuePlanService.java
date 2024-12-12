package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.targe.iot.repository.SensorValuePlanRepository;
import tr.com.targe.iot.entity.SensorValuePlan;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SensorValuePlanService {
    
    private final SensorValuePlanRepository sensorValuePlanRepository;

    @Autowired
    public SensorValuePlanService(SensorValuePlanRepository sensorValuePlanRepository) {
        this.sensorValuePlanRepository = sensorValuePlanRepository;
    }

    public List<SensorValuePlan> getAllSensorValuePlans() {
        return sensorValuePlanRepository.findAll();
    }

    public Optional<SensorValuePlan> getSensorValuePlanById(Long id) {
        return sensorValuePlanRepository.findById(id);
    }

    public SensorValuePlan createSensorValuePlan(SensorValuePlan plan) {
        return sensorValuePlanRepository.save(plan);
    }

    public SensorValuePlan updateSensorValuePlan(Long id, SensorValuePlan updatedPlan, String updateBy) {
        return sensorValuePlanRepository.findById(id)
            .map(existing -> {
                existing.setUpdateAt(LocalDateTime.now());
                existing.setUpdateBy(updateBy);
                return sensorValuePlanRepository.save(existing);
            })
            .orElse(null);
    }

    public void deleteSensorValuePlan(Long id, String deleteBy) {
        sensorValuePlanRepository.findById(id).ifPresent(plan -> {
            plan.setDeleteAt(LocalDateTime.now());
            plan.setDeleteBy(deleteBy);
            sensorValuePlanRepository.deleteById(id);
        });
    }
}