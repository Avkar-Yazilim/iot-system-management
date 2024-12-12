package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.targe.iot.repository.RestRequestRepository;
import tr.com.targe.iot.entity.RestRequest;


import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RestRequestService {
    
    private final RestRequestRepository restRequestRepository;

    @Autowired
    public RestRequestService(RestRequestRepository restRequestRepository) {
        this.restRequestRepository = restRequestRepository;
    }

    public List<RestRequest> getAllRestRequests() {
        return restRequestRepository.findAll();
    }

    public Optional<RestRequest> getRestRequestById(Long id) {
        return restRequestRepository.findById(id);
    }

    public RestRequest createRestRequest(RestRequest request) {
        return restRequestRepository.save(request);
    }

    public RestRequest updateRestRequest(Long id, RestRequest updatedRequest) {
        return restRequestRepository.findById(id)
            .map(existing -> {
                return restRequestRepository.save(existing);
            })
            .orElse(null);

    }

    public void deleteRestRequest(Long id) {
        restRequestRepository.findById(id).ifPresent(request -> {
            restRequestRepository.save(request);
        });
    }
}