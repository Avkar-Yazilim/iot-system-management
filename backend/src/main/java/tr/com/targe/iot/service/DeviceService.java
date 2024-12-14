package tr.com.targe.iot.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.com.targe.iot.entity.Device;
import tr.com.targe.iot.repository.DeviceRepository;
import tr.com.targe.iot.mapper.DeviceMapper;
import tr.com.targe.iot.DTO.DeviceDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DeviceService {

    private final DeviceRepository deviceRepository;
    private final DeviceMapper deviceMapper;


    public List<DeviceDTO> getAllDevices() {
        return deviceRepository.findAll().stream()
                .map(deviceMapper::toDTO)
                .collect(Collectors.toList());
    }

    public DeviceDTO getDeviceById(Long id) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found"));
        return deviceMapper.toDTO(device);
    }

    public DeviceDTO createDevice(DeviceDTO deviceDTO) {
        Device device = deviceMapper.toEntity(deviceDTO);
        device.setCreateAt(LocalDateTime.now());
        device.setCreateBy("ADMİN");
        device.setSystemId(deviceDTO.getSystemId());
        device.setVersion(deviceDTO.getVersion());
        Device savedDevice = deviceRepository.save(device);
        return deviceMapper.toDTO(savedDevice); 
    }

    public DeviceDTO updateDevice(Long id, DeviceDTO deviceDTO) {
        Device existingDevice = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found"));
        updateDeviceFields(existingDevice, deviceDTO);
        Device updatedDevice = deviceRepository.save(existingDevice);
        return deviceMapper.toDTO(updatedDevice);
    }

    public void deleteDevice(Long id) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found"));
        device.setDeleteAt(LocalDateTime.now());
        device.setDeviceStatus("INACTIVE");
        deviceRepository.save(device);
    }


    public DeviceDTO updateDeviceStatus(Long id, String status) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found"));
        device.setDeviceStatus(status);
        device.setUpdateAt(LocalDateTime.now());
        Device updatedDevice = deviceRepository.save(device);
        return deviceMapper.toDTO(updatedDevice);
    }

    private void updateDeviceFields(Device existingDevice, DeviceDTO newDeviceDTO) {
        existingDevice.setDeviceName(newDeviceDTO.getDeviceName());
        existingDevice.setDeviceType(newDeviceDTO.getDeviceType());
        existingDevice.setDeviceStatus(newDeviceDTO.getDeviceStatus());
        existingDevice.setUpdateAt(LocalDateTime.now());
        existingDevice.setUpdateBy("admin");
        existingDevice.setVersion(newDeviceDTO.getVersion());
    }

    public Device findDeviceById(Long id) {
        return deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found"));
    }
}