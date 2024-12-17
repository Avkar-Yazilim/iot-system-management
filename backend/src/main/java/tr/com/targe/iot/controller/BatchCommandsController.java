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

}
