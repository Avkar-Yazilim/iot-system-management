package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.targe.iot.repository.SensorRepository;
import tr.com.targe.iot.entity.Sensor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SensorService {
    
    private final SensorRepository sensorRepository;

    @Autowired
    public SensorService(SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    @Transactional(readOnly = true)
    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Sensor> getSensorById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Sensor ID cannot be null");
        }
        return sensorRepository.findById(id);
    }

    public Sensor createSensor(Sensor sensor, String createBy) {
        if (sensor == null) {
            throw new IllegalArgumentException("Sensor cannot be null");
        }
        if (createBy == null || createBy.trim().isEmpty()) {
            throw new IllegalArgumentException("CreateBy cannot be null or empty");
        }
        
        validateSensor(sensor);
        
        sensor.setCreateAt(LocalDateTime.now());
        sensor.setCreateBy(createBy);
        return sensorRepository.save(sensor);
    }

    public Sensor updateSensor(Long id, Sensor updatedSensor) {
        if (id == null || updatedSensor == null) {
            throw new IllegalArgumentException("Sensor ID and updated sensor cannot be null");
        }
        validateSensor(updatedSensor);

        return sensorRepository.findById(id)
            .map(existingSensor -> {
                existingSensor.setDevice(updatedSensor.getDevice());
                existingSensor.setSensorType(updatedSensor.getSensorType());
                existingSensor.setSensorName(updatedSensor.getSensorName());
                existingSensor.setVersion(updatedSensor.getVersion());
                existingSensor.setUpdateAt(LocalDateTime.now());
                existingSensor.setUpdateBy(updatedSensor.getUpdateBy());
                return sensorRepository.save(existingSensor);
            })
            .orElseThrow(() -> new IllegalArgumentException("Sensor not found with id: " + id));
    }

    public void deleteSensor(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Sensor ID cannot be null");
        }
        sensorRepository.findById(id).ifPresent(sensor -> {
            sensor.setDeleteAt(LocalDateTime.now());
            sensorRepository.save(sensor);
        });
    }

    // Helper method for validation
    private void validateSensor(Sensor sensor) {
        if (sensor.getDevice() == null) {
            throw new IllegalArgumentException("Device cannot be null");
        }
        if (sensor.getSensorType() == null || sensor.getSensorType().trim().isEmpty()) {
            throw new IllegalArgumentException("Sensor type cannot be null or empty");
        }
        if (sensor.getSensorName() == null || sensor.getSensorName().trim().isEmpty()) {
            throw new IllegalArgumentException("Sensor name cannot be null or empty");
        }
        if (sensor.getVersion() == null || sensor.getVersion().trim().isEmpty()) {
            throw new IllegalArgumentException("Version cannot be null or empty");
        }
        if (sensor.getCreateBy() == null || sensor.getCreateBy().trim().isEmpty()) {
            throw new IllegalArgumentException("CreateBy cannot be null or empty");
        }
    }

    // Additional query methods that might be useful
    @Transactional(readOnly = true)
    public List<Sensor> getSensorsByDevice(Long deviceId) {
        // Note: You'll need to add this method to SensorRepository
        return sensorRepository.findByDeviceDeviceId(deviceId);
    }
}
