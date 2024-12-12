package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.targe.iot.repository.RestParameterRepository;
import tr.com.targe.iot.entity.RestParameter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RestParameterService {
    
    private final RestParameterRepository restParameterRepository;

    @Autowired
    public RestParameterService(RestParameterRepository restParameterRepository) {
        this.restParameterRepository = restParameterRepository;
    }

    public List<RestParameter> getAllRestParameters() {
        return restParameterRepository.findAll();
    }

    public Optional<RestParameter> getRestParameterById(Long id) {
        return restParameterRepository.findById(id);
    }

    public RestParameter createRestParameter(RestParameter parameter) {
        return restParameterRepository.save(parameter);
    }

    public RestParameter updateRestParameter(Long id, RestParameter updatedParameter) {
        return restParameterRepository.findById(id)
            .map(existing -> {
                existing.setParameterKey(updatedParameter.getParameterKey());
                existing.setParameterValue(updatedParameter.getParameterValue());
                existing.setRequest(updatedParameter.getRequest());
                return restParameterRepository.save(existing);
            })
            .orElse(null);
    }
}
