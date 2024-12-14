package tr.com.targe.iot.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tr.com.targe.iot.DTO.BatchCommandsDTO;
import tr.com.targe.iot.entity.BatchCommands;
import tr.com.targe.iot.entity.Device;
import tr.com.targe.iot.repository.DeviceRepository;

@Component
public class BatchCommandsMapper {
    @Autowired
    private DeviceRepository deviceRepository;

    public BatchCommandsDTO toDTO(BatchCommands batchCommands) {
        if (batchCommands == null) return null;
        BatchCommandsDTO dto = new BatchCommandsDTO();
        dto.setDeviceId(batchCommands.getDeviceId());
        dto.setCommandId(batchCommands.getCommandId());
        dto.setCommand(batchCommands.getCommand());
        dto.setTimestamp(batchCommands.getTimestamp());
        dto.setStatus(batchCommands.getCommandStatus());
        dto.setFeedback(batchCommands.getFeedback());
        dto.setPriority(batchCommands.getPriority());
        return dto;
    }

    public BatchCommands toEntity(BatchCommandsDTO dto) {
        if (dto == null) return null;
        BatchCommands entity = new BatchCommands();
        entity.setDeviceId(dto.getDeviceId());
        entity.setCommand(dto.getCommand());
        entity.setTimestamp(dto.getTimestamp());
        entity.setCommandStatus(dto.getStatus());
        entity.setFeedback(dto.getFeedback());
        entity.setPriority(dto.getPriority() != null ? dto.getPriority() : 0);
        
        if (dto.getDeviceId() != null) {
            Device device = deviceRepository.findById(dto.getDeviceId())
                .orElseThrow(() -> new RuntimeException("Device not found"));
            entity.setDevice(device);
        }
        
        return entity;
    }
}

