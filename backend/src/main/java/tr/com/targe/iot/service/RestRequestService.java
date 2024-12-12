package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.targe.iot.repository.RestRequestRepository;
import tr.com.targe.iot.entity.RestRequest;

import java.time.LocalDateTime;
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

    public Optional<RestRequest> getRestRequestById(Integer id) {
        return restRequestRepository.findById(id);
    }

    public RestRequest createRestRequest(RestRequest request) {
        return restRequestRepository.save(request);
    }

    public RestRequest updateRestRequest(Integer id, RestRequest updatedRequest) {
        return restRequestRepository.findById(id)
            .map(existing -> {
                // Update fields as needed
                return restRequestRepository.save(existing);
            })
            .orElse(null);
    }

    public void deleteRestRequest(Integer id) {
        restRequestRepository.deleteById(id);
    }
}