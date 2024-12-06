package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.targe.iot.entity.BatchCommands;
import tr.com.targe.iot.repository.BatchCommandsRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BatchCommandsService {

    private final BatchCommandsRepository batchCommandsRepository;

    @Autowired
    public BatchCommandsService(BatchCommandsRepository batchCommandsRepository) {
        this.batchCommandsRepository = batchCommandsRepository;
    }

    // Create or Update a BatchCommand
    public BatchCommands saveOrUpdateBatchCommand(BatchCommands batchCommand) {
        return batchCommandsRepository.save(batchCommand);
    }

    // Retrieve a BatchCommand by ID
    public Optional<BatchCommands> getBatchCommandById(Long id) {
        return batchCommandsRepository.findById(id);
    }

    // Retrieve all BatchCommands
    public List<BatchCommands> getAllBatchCommands() {
        return batchCommandsRepository.findAll();
    }

    // Delete a BatchCommand by ID
    public void deleteBatchCommandById(Long id) {
        batchCommandsRepository.deleteById(id);
    }
}
