package tr.com.targe.iot.controller;

import tr.com.targe.iot.entity.RestParameter;
import tr.com.targe.iot.service.RestParameterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rest-parameters")
public class RestParameterController {

    private final RestParameterService restParameterService;

    public RestParameterController(RestParameterService restParameterService) {
        this.restParameterService = restParameterService;
    }

    @GetMapping
    public List<RestParameter> getAllRestParameters() {
        return restParameterService.getAllRestParameters();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestParameter> getRestParameterById(@PathVariable Integer id) {
        Optional<RestParameter> restParameter = restParameterService.getRestParameterById(id);
        return restParameter.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RestParameter> createRestParameter(@RequestBody RestParameter restParameter) {
        RestParameter createdRestParameter = restParameterService.createRestParameter(restParameter);
        return ResponseEntity.status(201).body(createdRestParameter); 
    }

    @PutMapping("/{id}")
    public ResponseEntity<RestParameter> updateRestParameter(@PathVariable Integer id, @RequestBody RestParameter updatedRestParameter) {
        RestParameter restParameter = restParameterService.updateRestParameter(id, updatedRestParameter);
        if (restParameter != null) {
            return ResponseEntity.ok(restParameter);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestParameter(@PathVariable Integer id) {
        restParameterService.deleteRestParameter(id);
        return ResponseEntity.noContent().build(); 
    }
}
