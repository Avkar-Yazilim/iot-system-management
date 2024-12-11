package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.targe.iot.repository.DeviceRepository;
import tr.com.targe.iot.entity.Device;
import tr.com.targe.iot.entity.Device.DeviceStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DeviceService {

    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceService(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    public Optional<Device> getDeviceById(Long id) {
        return deviceRepository.findById(id);
    }

    public Device createDevice(Device device, String createBy) {
        if (device == null) {
            throw new IllegalArgumentException("Device cannot be null");
        }
        if (createBy == null || createBy.trim().isEmpty()) {
            throw new IllegalArgumentException("CreateBy cannot be null or empty");
        }

        device.setCreateAt(LocalDateTime.now());
        device.setCreateBy(createBy);
        device.setDeviceStatus(DeviceStatus.INACTIVE);
        return deviceRepository.save(device);
    }

    public Device updateDevice(Long id, Device updatedDevice) {
        return deviceRepository.findById(id)
            .map(existingDevice -> {
                existingDevice.setDeviceName(updatedDevice.getDeviceName());
                existingDevice.setDeviceType(updatedDevice.getDeviceType());
                existingDevice.setSubSystem(updatedDevice.getSubSystem());
                existingDevice.setVersion(updatedDevice.getVersion());
                existingDevice.setDeviceStatus(updatedDevice.getDeviceStatus());
                existingDevice.setUpdateAt(LocalDateTime.now());
                existingDevice.setUpdateBy(updatedDevice.getUpdateBy());
                return deviceRepository.save(existingDevice);
            })
            .orElse(null);
    }

    public void deleteDevice(Long id, String deletedBy) {
        deviceRepository.findById(id).ifPresent(device -> {
            device.setDeleteAt(LocalDateTime.now());
            device.setDeleteBy(deletedBy);
            deviceRepository.save(device);
        });
    }

    public void updateDeviceStatus(Long id, DeviceStatus status, String updatedBy) {
        deviceRepository.findById(id).ifPresent(device -> {
            device.setDeviceStatus(status);
            device.setUpdateAt(LocalDateTime.now());
            device.setUpdateBy(updatedBy);
            deviceRepository.save(device);
        });
    }
}