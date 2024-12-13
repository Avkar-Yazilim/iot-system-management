package tr.com.targe.iot.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.targe.iot.repository.DeviceLogRepository;
import tr.com.targe.iot.entity.DeviceLog;
import tr.com.targe.iot.entity.Device;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DeviceLogService {
    
    private final DeviceLogRepository deviceLogRepository;
    private final DeviceService deviceService;

    public List<DeviceLog> getAllDeviceLogs() {
        return deviceLogRepository.findAll();
    }

    public Optional<DeviceLog> getDeviceLogById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        return deviceLogRepository.findById(id);
    }

    public List<DeviceLog> getLogsByDevice(Long deviceId) {
        Device device = deviceService.findDeviceById(deviceId);
        return deviceLogRepository.findByDevice(device);
    }
}
