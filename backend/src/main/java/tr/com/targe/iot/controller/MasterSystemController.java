package tr.com.targe.iot.controller;

import tr.com.targe.iot.entity.MasterSystem;
import tr.com.targe.iot.service.MasterSystemService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mastersystems")
public class MasterSystemController {

    private final MasterSystemService masterSystemService;

    public MasterSystemController(MasterSystemService masterSystemService) {
        this.masterSystemService = masterSystemService;
    }

    @GetMapping
    public List<MasterSystem> getAllMasterSystems() {
        return masterSystemService.getAllMasterSystems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MasterSystem> getMasterSystemById(@PathVariable Long id) {
        Optional<MasterSystem> masterSystem = masterSystemService.getMasterSystemById(id);
        return masterSystem.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public MasterSystem createMasterSystem(@RequestBody MasterSystem masterSystem) {
        return masterSystemService.createMasterSystem(masterSystem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MasterSystem> updateMasterSystem(@PathVariable Long id, @RequestBody MasterSystem updatedSystem) {
        MasterSystem system = masterSystemService.updateMasterSystem(id, updatedSystem);
        if (system != null) {
            return ResponseEntity.ok(system);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMasterSystem(@PathVariable Long id) {
        masterSystemService.deleteMasterSystem(id);
        return ResponseEntity.noContent().build();
    }
}
