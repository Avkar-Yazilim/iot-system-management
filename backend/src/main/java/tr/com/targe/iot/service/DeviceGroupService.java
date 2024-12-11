package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.targe.iot.repository.DeviceGroupRepository;
import tr.com.targe.iot.entity.DeviceGroup;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DeviceGroupService {
    
    private final DeviceGroupRepository deviceGroupRepository;

    @Autowired
    public DeviceGroupService(DeviceGroupRepository deviceGroupRepository) {
        this.deviceGroupRepository = deviceGroupRepository;
    }

    @Transactional(readOnly = true)
    public List<DeviceGroup> getAllDeviceGroups() {
        return deviceGroupRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<DeviceGroup> getDeviceGroupById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Device Group ID cannot be null");
        }
        return deviceGroupRepository.findById(id);
    }

    public DeviceGroup createDeviceGroup(DeviceGroup deviceGroup, String createBy) {
        if (deviceGroup == null) {
            throw new IllegalArgumentException("Device Group cannot be null");
        }
        if (createBy == null || createBy.trim().isEmpty()) {
            throw new IllegalArgumentException("CreateBy cannot be null or empty");
        }

        validateDeviceGroup(deviceGroup);
        deviceGroup.setCreateAt(LocalDateTime.now());
        deviceGroup.setCreateBy(createBy);
        return deviceGroupRepository.save(deviceGroup);
    }

    public DeviceGroup updateDeviceGroup(Long id, DeviceGroup updatedDeviceGroup) {
        if (id == null || updatedDeviceGroup == null) {
            throw new IllegalArgumentException("Device Group ID and updated device group cannot be null");
        }

        return deviceGroupRepository.findById(id)
            .map(existingGroup -> {
                existingGroup.setGroupName(updatedDeviceGroup.getGroupName());
                existingGroup.setDevices(updatedDeviceGroup.getDevices());
                existingGroup.setUpdateAt(LocalDateTime.now());
                existingGroup.setUpdateBy(updatedDeviceGroup.getUpdateBy());
                return deviceGroupRepository.save(existingGroup);
            })
            .orElseThrow(() -> new IllegalArgumentException("Device Group not found with id: " + id));
    }

    public void deleteDeviceGroup(Long id, String deletedBy) {
        if (id == null) {
            throw new IllegalArgumentException("Device Group ID cannot be null");
        }
        if (deletedBy == null || deletedBy.trim().isEmpty()) {
            throw new IllegalArgumentException("DeletedBy cannot be null or empty");
        }

        deviceGroupRepository.findById(id).ifPresent(deviceGroup -> {
            deviceGroup.setDeleteAt(LocalDateTime.now());
            deviceGroup.setDeleteBy(deletedBy);
            deviceGroupRepository.save(deviceGroup);
        });
    }

    private void validateDeviceGroup(DeviceGroup deviceGroup) {
        if (deviceGroup.getGroupName() == null || deviceGroup.getGroupName().trim().isEmpty()) {
            throw new IllegalArgumentException("Group name cannot be null or empty");
        }
        // Add additional validation as needed
    }
}
