package tr.com.targe.iot.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tr.com.targe.iot.DTO.DeviceDTO;
import tr.com.targe.iot.entity.Device;
import tr.com.targe.iot.entity.DeviceLog;
import tr.com.targe.iot.mapper.DeviceMapper;
import tr.com.targe.iot.repository.DeviceLogRepository;
import tr.com.targe.iot.repository.DeviceRepository;

@Service
@RequiredArgsConstructor
public class DeviceService {

    private final DeviceRepository deviceRepository;
    private final DeviceMapper deviceMapper;
    @Autowired
    private DeviceLogRepository deviceLogRepository;


    public List<DeviceDTO> getAllDevices() {
        List<Device> devices = deviceRepository.findAllActive();
        System.out.println("Found devices: " + devices); // Debug için
        return devices.stream()
                .map(deviceMapper::toDTO)
                .collect(Collectors.toList());
    }

    public DeviceDTO getDeviceById(Long id) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found"));
        return deviceMapper.toDTO(device);
    }

    public DeviceDTO createDevice(DeviceDTO deviceDTO) {
        try {
            Device device = deviceMapper.toEntity(deviceDTO);
            device.setSystemId(1L);
            device.setDeviceStatus("inactive");
            device.setCreateAt(LocalDateTime.now());
            device.setCreateBy("admin");
            device.setVersion("1.0");
            
            Device savedDevice = deviceRepository.save(device);
            
            return deviceMapper.toDTO(savedDevice);
        } catch (Exception e) {
            throw new RuntimeException("Device creation failed: " + e.getMessage());
        }
    }

    public DeviceDTO updateDevice(Long id, DeviceDTO deviceDTO) {
        Device existingDevice = deviceRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Device not found"));
        
        updateDeviceFields(existingDevice, deviceDTO);
        
        existingDevice.setDeviceName(deviceDTO.getDeviceName());
        Device updatedDevice = deviceRepository.save(existingDevice);
        
        // Log kaydı
        DeviceLog log = new DeviceLog();
        log.setDevice(updatedDevice);
        log.setMessage("Cihazın adı '" + updatedDevice.getDeviceName() + "' olarak değiştirildi");
        log.setTimestamp(LocalDateTime.now());
        deviceLogRepository.save(log);
        
        return deviceMapper.toDTO(updatedDevice);
    }

    public void deleteDevice(Long id, String username) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cihaz bulunamadı"));
        device.setDeleteBy("admin");
        device.setDeleteAt(LocalDateTime.now());
        deviceRepository.save(device);
    }


    public DeviceDTO updateDeviceStatus(Long id, String status) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found"));
        device.setUpdateAt(LocalDateTime.now());
        Device updatedDevice = deviceRepository.save(device);
        return deviceMapper.toDTO(updatedDevice);
    }

    private void updateDeviceFields(Device existingDevice, DeviceDTO newDeviceDTO) {
        existingDevice.setDeviceName(newDeviceDTO.getDeviceName());
        existingDevice.setDeviceType(newDeviceDTO.getDeviceType());
        existingDevice.setDeviceStatus("inactive");
        existingDevice.setUpdateAt(LocalDateTime.now());
        existingDevice.setUpdateBy("admin");
        existingDevice.setVersion(newDeviceDTO.getVersion());
    }

    public Device findDeviceById(Long id) {
        return deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found"));
    }
}