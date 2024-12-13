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
        dto.setCreateAt(device.getCreateAt());
        dto.setCreateBy(device.getCreateBy());
        dto.setUpdateAt(device.getUpdateAt());
        dto.setUpdateBy(device.getUpdateBy());
        dto.setVersion(device.getVersion());
        dto.setSystemId(device.getSystemId());
        
       
        
        return dto;
    }
    
    public Device toEntity(DeviceDTO dto) {
        if (dto == null) return null;
        
        Device device = new Device();
        device.setDeviceId(dto.getDeviceId());
        device.setDeviceName(dto.getDeviceName());
        device.setDeviceType(dto.getDeviceType());
        device.setDeviceStatus(dto.getDeviceStatus());
        device.setCreateBy(dto.getCreateBy());
        device.setUpdateBy(dto.getUpdateBy());
        device.setVersion(dto.getVersion());
        device.setSystemId(dto.getSystemId());
        
        return device;
    }
} 