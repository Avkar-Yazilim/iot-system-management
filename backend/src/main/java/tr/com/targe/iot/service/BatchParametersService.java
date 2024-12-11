package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.targe.iot.repository.BatchParametersRepository;
import tr.com.targe.iot.entity.BatchParameters;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BatchParametersService {
    
    private final BatchParametersRepository batchParametersRepository;

    @Autowired
    public BatchParametersService(BatchParametersRepository batchParametersRepository) {
        this.batchParametersRepository = batchParametersRepository;
    }

    public List<BatchParameters> getAllBatchParameters() {
        return batchParametersRepository.findAll();
    }

    public Optional<BatchParameters> getBatchParameterById(Long id) {
        return batchParametersRepository.findById(id);
    }

    public BatchParameters createBatchParameter(BatchParameters parameter, String createBy) {
        parameter.setCreateAt(LocalDateTime.now());
        parameter.setCreateBy(createBy);
        return batchParametersRepository.save(parameter);
    }

    public BatchParameters updateBatchParameter(Long id, BatchParameters updatedParameter) {
        return batchParametersRepository.findById(id)
            .map(existing -> {
                existing.setUpdateAt(LocalDateTime.now());
                existing.setUpdateBy(updatedParameter.getUpdateBy());
                // Update other fields as needed
                return batchParametersRepository.save(existing);
            })
            .orElse(null);
    }

    public void deleteBatchParameter(Long id, String deletedBy) {
        batchParametersRepository.findById(id).ifPresent(parameter -> {
            parameter.setDeleteAt(LocalDateTime.now());
            parameter.setDeleteBy(deletedBy);
            batchParametersRepository.save(parameter);
        });
    }
}
