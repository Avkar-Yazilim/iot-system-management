package tr.com.targe.iot.mapper;
import org.springframework.stereotype.Component;

import tr.com.targe.iot.DTO.SensorValuesDTO;
import tr.com.targe.iot.entity.Device;
import tr.com.targe.iot.entity.SensorValues;

@Component
public class SensorValuesMapper {
    
    public SensorValuesDTO toDTO(SensorValues sensorValues) {
        if (sensorValues == null) return null;

        SensorValuesDTO dto = new SensorValuesDTO();
        dto.setSensorDataId(sensorValues.getSensorDataId());
        dto.setDeviceId(sensorValues.getDevice() != null ? sensorValues.getDevice().getDeviceId() : null);
        dto.setSensorType(sensorValues.getSensorType());
        dto.setUpdateAt(sensorValues.getUpdateAt());
        dto.setDataKey(sensorValues.getDataKey());
        dto.setDataValue(sensorValues.getDataValue());
        dto.setUnit(sensorValues.getUnit());
        return dto;
    }

    public SensorValues toEntity(SensorValuesDTO dto) {
        if (dto == null) return null;

        SensorValues entity = new SensorValues();
        entity.setSensorDataId(dto.getSensorDataId());
        entity.setSensorType(dto.getSensorType());
        entity.setUpdateAt(dto.getUpdateAt());
        entity.setDataKey(dto.getDataKey());
        entity.setDataValue(dto.getDataValue());
        entity.setUnit(dto.getUnit());

        Device device = new Device();
            device.setDeviceId(dto.getDeviceId());
            entity.setDevice(device);
        return entity;
    }

}
