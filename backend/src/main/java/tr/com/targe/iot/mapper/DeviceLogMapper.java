package tr.com.targe.iot.mapper;

import org.springframework.stereotype.Component;
import tr.com.targe.iot.DTO.DeviceLogDTO;
import tr.com.targe.iot.entity.DeviceLog;

@Component
public class DeviceLogMapper {

    public DeviceLogDTO toDTO(DeviceLog deviceLog) {
        if (deviceLog == null) return null;
        
        DeviceLogDTO dto = new DeviceLogDTO();
        dto.setDeviceId(deviceLog.getDeviceId());
        dto.setLogId(deviceLog.getLogId());
        dto.setMessage(deviceLog.getMessage());
        dto.setTimestamp(deviceLog.getTimestamp());
        return dto;
    }

    public DeviceLog toEntity(DeviceLogDTO dto) {
        if (dto == null) return null;
        
        DeviceLog deviceLog = new DeviceLog();
        deviceLog.setDeviceId(dto.getDeviceId());
        deviceLog.setLogId(dto.getLogId());
        deviceLog.setMessage(dto.getMessage());
        deviceLog.setTimestamp(dto.getTimestamp());
        return deviceLog;
    }
}   

