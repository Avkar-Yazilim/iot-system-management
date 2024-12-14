package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.targe.iot.repository.BatchCommandsRepository;
import tr.com.targe.iot.entity.BatchCommands;


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



}
