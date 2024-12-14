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
    public ResponseEntity<BatchParameters> getBatchParameterById(@PathVariable Long id) {
        Optional<BatchParameters> parameter = batchParametersService.getBatchParameterById(id);
        return parameter.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

   
}
