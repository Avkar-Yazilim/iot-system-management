package tr.com.targe.iot.mapper;

import org.springframework.stereotype.Component;

import tr.com.targe.iot.DTO.DeviceDTO;
import tr.com.targe.iot.entity.Device;

@Component
public class DeviceMapper {
    
    public DeviceDTO toDTO(Device device) {
        if (device == null) return null;
        
        DeviceDTO dto = new DeviceDTO();
        dto.setDeviceId(device.getDeviceId());
        dto.setDeviceName(device.getDeviceName());
        dto.setDeviceType(device.getDeviceType());
        dto.setDeviceStatus(device.getDeviceStatus());
        dto.setSystemId(device.getSystemId());
        dto.setVersion(device.getVersion());
        dto.setCreateBy(device.getCreateBy());
        dto.setCreateAt(device.getCreateAt());
        dto.setUpdateBy(device.getUpdateBy());
        dto.setUpdateAt(device.getUpdateAt());
        return dto;
    }
    
    public Device toEntity(DeviceDTO dto) {
        if (dto == null) return null;
        
        Device device = new Device();
        device.setDeviceId(dto.getDeviceId());
        device.setDeviceName(dto.getDeviceName());
        device.setDeviceType(dto.getDeviceType());
        device.setDeviceStatus(dto.getDeviceStatus());
        device.setSystemId(1L);
        device.setVersion(dto.getVersion());
        device.setCreateBy(dto.getCreateBy());
        device.setCreateAt(dto.getCreateAt());
        device.setUpdateAt(dto.getUpdateAt());
        device.setUpdateBy(dto.getUpdateBy());
        return device;
    }
} 