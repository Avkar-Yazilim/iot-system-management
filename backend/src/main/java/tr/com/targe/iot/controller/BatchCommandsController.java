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
    public ResponseEntity<BatchCommands> getBatchCommandById(@PathVariable Long id) {
        Optional<BatchCommands> command = batchCommandsService.getBatchCommandById(id);
        return command.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }



}
