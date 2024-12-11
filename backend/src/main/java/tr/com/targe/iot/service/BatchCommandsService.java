package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.targe.iot.repository.BatchCommandsRepository;
import tr.com.targe.iot.entity.BatchCommands;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BatchCommandsService {
    
    private final BatchCommandsRepository batchCommandsRepository;

    @Autowired
    public BatchCommandsService(BatchCommandsRepository batchCommandsRepository) {
        this.batchCommandsRepository = batchCommandsRepository;
    }

    public List<BatchCommands> getAllBatchCommands() {
        return batchCommandsRepository.findAll();
    }

    public Optional<BatchCommands> getBatchCommandById(Long id) {
        return batchCommandsRepository.findById(id);
    }

    public BatchCommands createBatchCommand(BatchCommands command, String createBy) {
        command.setCreateAt(LocalDateTime.now());
        command.setCreateBy(createBy);
        return batchCommandsRepository.save(command);
    }

    public BatchCommands updateBatchCommand(Long id, BatchCommands updatedCommand) {
        return batchCommandsRepository.findById(id)
            .map(existing -> {
                existing.setUpdateAt(LocalDateTime.now());
                existing.setUpdateBy(updatedCommand.getUpdateBy());
                // Update other fields as needed
                return batchCommandsRepository.save(existing);
            })
            .orElse(null);
    }

    public void deleteBatchCommand(Long id, String deletedBy) {
        batchCommandsRepository.findById(id).ifPresent(command -> {
            command.setDeleteAt(LocalDateTime.now());
            command.setDeleteBy(deletedBy);
            batchCommandsRepository.save(command);
        });
    }
}
