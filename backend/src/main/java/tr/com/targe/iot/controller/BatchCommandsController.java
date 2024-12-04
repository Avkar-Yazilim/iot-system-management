package tr.com.targe.iot.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.targe.iot.entity.BatchCommands;
import tr.com.targe.iot.service.BatchCommandsService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/batch-commands")
public class BatchCommandsController {

    private final BatchCommandsService batchCommandsService;

    public BatchCommandsController(BatchCommandsService batchCommandsService) {
        this.batchCommandsService = batchCommandsService;
    }

    @GetMapping
    public ResponseEntity<List<BatchCommands>> getAllBatchCommands() {
        List<BatchCommands> commands = batchCommandsService.getAllBatchCommands();
        return ResponseEntity.ok(commands);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BatchCommands> getBatchCommandById(@PathVariable Integer id) {
        Optional<BatchCommands> command = batchCommandsService.getBatchCommandById(id);
        return command.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BatchCommands> createBatchCommand(@RequestBody BatchCommands batchCommand) {
        BatchCommands createdCommand = batchCommandsService.createBatchCommand(batchCommand);
        return ResponseEntity.status(201).body(createdCommand); 
    }

    @PutMapping("/{id}")
    public ResponseEntity<BatchCommands> updateBatchCommand(
            @PathVariable Integer id,
            @RequestBody BatchCommands updatedCommand) {
        BatchCommands command = batchCommandsService.updateBatchCommand(id, updatedCommand);
        if (command != null) {
            return ResponseEntity.ok(command);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBatchCommand(@PathVariable Integer id) {
        batchCommandsService.deleteBatchCommand(id);
        return ResponseEntity.noContent().build(); 
    }
}
