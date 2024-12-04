package tr.com.targe.iot.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.targe.iot.entity.BatchParameters;
import tr.com.targe.iot.service.BatchParametersService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/batch-parameters")
public class BatchParametersController {

    private final BatchParametersService batchParametersService;

    public BatchParametersController(BatchParametersService batchParametersService) {
        this.batchParametersService = batchParametersService;
    }

    @GetMapping
    public ResponseEntity<List<BatchParameters>> getAllBatchParameters() {
        List<BatchParameters> parameters = batchParametersService.getAllBatchParameters();
        return ResponseEntity.ok(parameters);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BatchParameters> getBatchParameterById(@PathVariable Integer id) {
        Optional<BatchParameters> parameter = batchParametersService.getBatchParameterById(id);
        return parameter.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BatchParameters> createBatchParameter(@RequestBody BatchParameters batchParameter) {
        BatchParameters createdParameter = batchParametersService.createBatchParameter(batchParameter);
        return ResponseEntity.status(201).body(createdParameter); 
    }

    @PutMapping("/{id}")
    public ResponseEntity<BatchParameters> updateBatchParameter(
            @PathVariable Integer id,
            @RequestBody BatchParameters updatedParameter) {
        BatchParameters parameter = batchParametersService.updateBatchParameter(id, updatedParameter);
        if (parameter != null) {
            return ResponseEntity.ok(parameter);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBatchParameter(@PathVariable Integer id) {
        batchParametersService.deleteBatchParameter(id);
        return ResponseEntity.noContent().build(); 
    }
}
