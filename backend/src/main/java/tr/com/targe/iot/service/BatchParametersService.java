package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.targe.iot.repository.BatchParametersRepository;
import tr.com.targe.iot.entity.BatchParameters;

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


}
