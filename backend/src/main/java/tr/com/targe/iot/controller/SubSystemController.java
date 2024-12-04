package tr.com.targe.iot.controller;

import tr.com.targe.iot.entity.SubSystem;
import tr.com.targe.iot.service.SubSystemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sub-systems")
public class SubSystemController {

    private final SubSystemService subSystemService;

    public SubSystemController(SubSystemService subSystemService) {
        this.subSystemService = subSystemService;
    }

    @GetMapping
    public List<SubSystem> getAllSubSystems() {
        return subSystemService.getAllSubSystems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubSystem> getSubSystemById(@PathVariable Long id) {
        Optional<SubSystem> subSystem = subSystemService.getSubSystemById(id);
        return subSystem.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SubSystem> createSubSystem(@RequestBody SubSystem subSystem) {
        SubSystem createdSubSystem = subSystemService.createSubSystem(subSystem);
        return ResponseEntity.status(201).body(createdSubSystem); 
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubSystem> updateSubSystem(@PathVariable Long id, @RequestBody SubSystem updatedSubSystem) {
        SubSystem subSystem = subSystemService.updateSubSystem(id, updatedSubSystem);
        if (subSystem != null) {
            return ResponseEntity.ok(subSystem);
        }
        return ResponseEntity.notFound().build();
    }

    // SubSystem kaydını sil
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubSystem(@PathVariable Long id) {
        subSystemService.deleteSubSystem(id);
        return ResponseEntity.noContent().build();
    }
}
