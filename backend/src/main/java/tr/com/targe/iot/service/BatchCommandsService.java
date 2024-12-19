package tr.com.targe.iot.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import tr.com.targe.iot.repository.BatchCommandsRepository;
import tr.com.targe.iot.entity.BatchCommands;
import tr.com.targe.iot.mapper.BatchCommandsMapper;
import tr.com.targe.iot.DTO.BatchCommandsDTO;
import tr.com.targe.iot.repository.DeviceRepository;
import tr.com.targe.iot.entity.Device;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BatchCommandsService {
    
    private final BatchCommandsRepository batchCommandsRepository;
    private final BatchCommandsMapper batchCommandsMapper;
    private final DeviceRepository deviceRepository;
   
    public List<BatchCommands> getAllBatchCommands() {
        return batchCommandsRepository.findAll();
    }

    public List<BatchCommandsDTO> getBatchCommandById(Long id) {
        return batchCommandsRepository.findByDeviceId(id).stream()
        .map(batchCommandsMapper::toDTO)
        .collect(Collectors.toList());
    }

    public BatchCommandsDTO createBatchCommand(BatchCommandsDTO batchCommandsDTO) {
        if (batchCommandsDTO.getDeviceId() == null) {
            throw new IllegalArgumentException("Device ID cannot be null");
        }
        
        if (batchCommandsDTO.getCommand() == null || batchCommandsDTO.getCommand().trim().isEmpty()) {
            throw new IllegalArgumentException("Command cannot be empty");
        }
        
        if (batchCommandsDTO.getStatus() == null) {
            batchCommandsDTO.setStatus("PENDING");
        }
        
        if (batchCommandsDTO.getFeedback() == null) {
            batchCommandsDTO.setFeedback("Initial command");
        }
        
        if (batchCommandsDTO.getPriority() == null) {
            batchCommandsDTO.setPriority(1);
        }
        
        if (batchCommandsDTO.getPriority() < 1 || batchCommandsDTO.getPriority() > 5) {
            throw new IllegalArgumentException("Priority must be between 1 and 5");
        }
        
        if (batchCommandsDTO.getTimestamp() == null) {
            batchCommandsDTO.setTimestamp(LocalDateTime.now());
        }

        Device device = deviceRepository.findById(batchCommandsDTO.getDeviceId())
            .orElseThrow(() -> new RuntimeException("Device not found with id: " + batchCommandsDTO.getDeviceId()));

        BatchCommands batchCommands = batchCommandsMapper.toEntity(batchCommandsDTO);
        batchCommands.setDevice(device);
        
        BatchCommands savedCommand = batchCommandsRepository.save(batchCommands);
        return batchCommandsMapper.toDTO(savedCommand);
    }

    public List<BatchCommandsDTO> getCommandsByDeviceId(Long deviceId) {
        List<BatchCommands> commands = batchCommandsRepository.findByDeviceId(deviceId);
        return commands.stream()
                .map(batchCommandsMapper::toDTO)
                .collect(Collectors.toList());
    }

    public BatchCommandsDTO updateBatchCommand(Long commandId, String status) {
        BatchCommands batchCommands = batchCommandsRepository.findById(commandId)
            .orElseThrow(() -> new RuntimeException("Batch command not found with id: " + commandId));
        batchCommands.setStatus(status);
        BatchCommands updatedCommand = batchCommandsRepository.save(batchCommands);
        return batchCommandsMapper.toDTO(updatedCommand);
    }

    public void executeScheduledCommands() {
        batchCommandsRepository.executeScheduledCommands();
    }

    public void resetCommandStatusToPending() {
        batchCommandsRepository.resetCommandStatusToPending();
    }
}
