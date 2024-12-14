package tr.com.targe.iot.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.targe.iot.repository.DeviceLogRepository;
import tr.com.targe.iot.entity.DeviceLog;
import tr.com.targe.iot.entity.Device;

import tr.com.targe.iot.DTO.DeviceLogDTO;
import java.util.List;
import java.util.stream.Collectors;
import tr.com.targe.iot.mapper.DeviceLogMapper;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DeviceLogService {

    private final DeviceLogRepository deviceLogRepository;
    private final DeviceService deviceService;
    private final DeviceLogMapper deviceLogMapper;

    public List<DeviceLogDTO> getAllDeviceLogs() {
        return deviceLogRepository.findLogs().stream()
        .map(deviceLogMapper::toDTO)
        .collect(Collectors.toList());
    }



    public List<DeviceLog> getLogsByDevice(Long deviceId) {
        Device device = deviceService.findDeviceById(deviceId);
        return deviceLogRepository.findByDevice(device);
    }

    public List<DeviceLog> getDeviceLogsByDeviceId(Long deviceId) {
        return deviceLogRepository.findByDeviceId(deviceId);
    }
}
