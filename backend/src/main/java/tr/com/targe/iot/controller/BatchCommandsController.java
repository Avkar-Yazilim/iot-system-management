package tr.com.targe.iot.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.targe.iot.service.BatchCommandsService;
import org.springframework.http.HttpStatus;
import tr.com.targe.iot.DTO.BatchCommandsDTO;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/batch-commands")
@CrossOrigin(origins = "http://localhost:5173")
public class BatchCommandsController {

    private final BatchCommandsService batchCommandsService;


    @GetMapping("/{deviceId}")
    public ResponseEntity<List<BatchCommandsDTO>> getBatchCommandById(@PathVariable Long deviceId) {
        List<BatchCommandsDTO> command = batchCommandsService.getBatchCommandById(deviceId);
        return ResponseEntity.ok(command);
    }

    @PostMapping
    public ResponseEntity<BatchCommandsDTO> createBatchCommand(@RequestBody BatchCommandsDTO command) {
        BatchCommandsDTO createdCommand = batchCommandsService.createBatchCommand(command);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCommand);
    }

    @GetMapping("/device/{deviceId}/commands")
    public ResponseEntity<List<BatchCommandsDTO>> getCommandsByDeviceId(@PathVariable Long deviceId) {
        List<BatchCommandsDTO> commands = batchCommandsService.getCommandsByDeviceId(deviceId);
        return ResponseEntity.ok(commands);
    }

    @PostMapping("/execute-scheduled")
    public ResponseEntity<Void> executeScheduledCommands() {
        batchCommandsService.executeScheduledCommands();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/reset-pending")
    public ResponseEntity<Void> resetCommandStatusToPending() {
        batchCommandsService.resetCommandStatusToPending();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/execute/{commandId}")
    public ResponseEntity<BatchCommandsDTO> executeBatchCommand(@PathVariable Long commandId) {
        BatchCommandsDTO executedCommand = batchCommandsService.executeBatchCommand(commandId);
        return ResponseEntity.ok(executedCommand);
    }

    @PostMapping("/stop/{commandId}")
    public ResponseEntity<BatchCommandsDTO> stopBatchCommand(@PathVariable Long commandId) {
        BatchCommandsDTO stoppedCommand = batchCommandsService.stopBatchCommand(commandId);
        return ResponseEntity.ok(stoppedCommand);
    }

    @PatchMapping("/{commandId}")
    public ResponseEntity<BatchCommandsDTO> updateCommandStatus(
            @PathVariable Long commandId,
            @RequestBody BatchCommandsDTO updateRequest) {
        BatchCommandsDTO updatedCommand = batchCommandsService.updateBatchCommand(
            commandId, 
            updateRequest.getStatus(), 
            updateRequest.getFeedback()
        );
        return ResponseEntity.ok(updatedCommand);
    }

}
