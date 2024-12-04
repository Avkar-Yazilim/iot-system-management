package tr.com.targe.iot.controller;

import tr.com.targe.iot.entity.RestRequest;
import tr.com.targe.iot.service.RestRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rest-requests")
public class RestRequestController {

    private final RestRequestService restRequestService;

    public RestRequestController(RestRequestService restRequestService) {
        this.restRequestService = restRequestService;
    }

    @GetMapping
    public List<RestRequest> getAllRestRequests() {
        return restRequestService.getAllRestRequests();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestRequest> getRestRequestById(@PathVariable Integer id) {
        Optional<RestRequest> restRequest = restRequestService.getRestRequestById(id);
        return restRequest.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RestRequest> createRestRequest(@RequestBody RestRequest restRequest) {
        RestRequest createdRestRequest = restRequestService.createRestRequest(restRequest);
        return ResponseEntity.status(201).body(createdRestRequest); 
    }

    @PutMapping("/{id}")
    public ResponseEntity<RestRequest> updateRestRequest(@PathVariable Integer id, @RequestBody RestRequest updatedRestRequest) {
        RestRequest restRequest = restRequestService.updateRestRequest(id, updatedRestRequest);
        if (restRequest != null) {
            return ResponseEntity.ok(restRequest);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestRequest(@PathVariable Integer id) {
        restRequestService.deleteRestRequest(id);
        return ResponseEntity.noContent().build(); 
    }
}
