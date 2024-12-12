package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.targe.iot.repository.SensorValuesRepository;
import tr.com.targe.iot.entity.SensorValues;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SensorValuesService {
    
    private final SensorValuesRepository sensorValuesRepository;

    @Autowired
    public SensorValuesService(SensorValuesRepository sensorValuesRepository) {
        this.sensorValuesRepository = sensorValuesRepository;
    }

    @Transactional(readOnly = true)
    public List<SensorValues> getAllSensorValues() {
        return sensorValuesRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<SensorValues> getSensorValueById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        return sensorValuesRepository.findById(id);
    }

    public SensorValues createSensorValue(SensorValues sensorValue) {
        if (sensorValue == null) {
            throw new IllegalArgumentException("SensorValue cannot be null");
        }
        validateSensorValue(sensorValue);
        sensorValue.setUpdateAt(LocalDateTime.now());
        return sensorValuesRepository.save(sensorValue);
    }

    public SensorValues updateSensorValue(Long id, SensorValues updatedValue) {
        if (id == null || updatedValue == null) {
            throw new IllegalArgumentException("ID and updated value cannot be null");
        }

        return sensorValuesRepository.findById(id)
            .map(existing -> {
                existing.setSensor(updatedValue.getSensor());
                existing.setDataKey(updatedValue.getDataKey());
                existing.setDataValue(updatedValue.getDataValue());
                existing.setUnit(updatedValue.getUnit());
                existing.setUpdateAt(LocalDateTime.now());
                return sensorValuesRepository.save(existing);
            })
            .orElseThrow(() -> new IllegalArgumentException("SensorValue not found with id: " + id));
    }

    public void deleteSensorValue(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        sensorValuesRepository.deleteById(id);
    }

    private void validateSensorValue(SensorValues sensorValue) {
        if (sensorValue.getSensor() == null) {
            throw new IllegalArgumentException("Sensor cannot be null");
        }
        if (sensorValue.getDataKey() == null || sensorValue.getDataKey().trim().isEmpty()) {
            throw new IllegalArgumentException("DataKey cannot be null or empty");
        }
        if (sensorValue.getDataValue() == null || sensorValue.getDataValue().trim().isEmpty()) {
            throw new IllegalArgumentException("DataValue cannot be null or empty");
        }
        if (sensorValue.getUnit() == null || sensorValue.getUnit().trim().isEmpty()) {
            throw new IllegalArgumentException("Unit cannot be null or empty");
        }
    }
}