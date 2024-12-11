package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.targe.iot.repository.DeviceLogRepository;
import tr.com.targe.iot.entity.DeviceLog;
import tr.com.targe.iot.entity.Device;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service    // Service anotasyonu ile DeviceLogService sınıfının bir Spring hizmeti olduğunu belirtiyoruz
@Transactional
public class DeviceLogService {
    
    private final DeviceLogRepository deviceLogRepository;
    private final DeviceService deviceService;

    @Autowired
    public DeviceLogService(DeviceLogRepository deviceLogRepository, DeviceService deviceService) {
        this.deviceLogRepository = deviceLogRepository;
        this.deviceService = deviceService;
    }

    @Transactional(readOnly = true)
    public List<DeviceLog> getAllDeviceLogs() {
        return deviceLogRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<DeviceLog> getDeviceLogById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        return deviceLogRepository.findById(id);
    }

    public DeviceLog createDeviceLog(DeviceLog deviceLog, String createBy) {
        if (deviceLog == null) {
            throw new IllegalArgumentException("DeviceLog cannot be null");
        }
        if (createBy == null || createBy.trim().isEmpty()) {
            throw new IllegalArgumentException("CreateBy cannot be null or empty");
        }
        if (deviceLog.getDevice() == null) {
            throw new IllegalArgumentException("Device cannot be null");
        }
        if (deviceLog.getMessage() == null || deviceLog.getMessage().trim().isEmpty()) {
            throw new IllegalArgumentException("Message cannot be null or empty");
        }

        deviceLog.setTimestamp(LocalDateTime.now());
        return deviceLogRepository.save(deviceLog);
    }

    public DeviceLog updateDeviceLog(Long id, DeviceLog updatedDeviceLog) {
        if (id == null || updatedDeviceLog == null) {
            throw new IllegalArgumentException("ID and DeviceLog cannot be null");
        }

        return deviceLogRepository.findById(id)
            .map(existingLog -> {
                existingLog.setDevice(updatedDeviceLog.getDevice());
                existingLog.setMessage(updatedDeviceLog.getMessage());
                existingLog.setTimestamp(LocalDateTime.now());
                return deviceLogRepository.save(existingLog);
            })
            .orElseThrow(() -> new IllegalArgumentException("DeviceLog not found with id: " + id));
    }

    public void deleteDeviceLog(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        deviceLogRepository.deleteById(id);
    }

    // Utility methods
    public void logDeviceMessage(Long deviceId, String message, String createBy) {
        if (deviceId == null || message == null || message.trim().isEmpty()) {
            throw new IllegalArgumentException("DeviceId and message cannot be null or empty");
        }
        if (createBy == null || createBy.trim().isEmpty()) {
            throw new IllegalArgumentException("CreateBy cannot be null or empty");
        }

        Device device = deviceService.getDeviceById(deviceId)
            .orElseThrow(() -> new IllegalArgumentException("Device not found with id: " + deviceId));

        DeviceLog log = new DeviceLog();
        log.setDevice(device);
        log.setMessage(message);
        log.setTimestamp(LocalDateTime.now());
        deviceLogRepository.save(log);
    }

    // Additional query methods that might be useful
    @Transactional(readOnly = true)
    public List<DeviceLog> getLogsByDevice(Long deviceId) {
        Device device = deviceService.getDeviceById(deviceId)
            .orElseThrow(() -> new IllegalArgumentException("Device not found with id: " + deviceId));
        // Note: You'll need to add this method to DeviceLogRepository
        return deviceLogRepository.findByDevice(device);
    }
}
