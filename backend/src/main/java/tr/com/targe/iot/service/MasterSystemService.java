package tr.com.targe.iot.service;

import tr.com.targe.iot.entity.MasterSystem;
import tr.com.targe.iot.repository.MasterSystemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MasterSystemService {

    private final MasterSystemRepository masterSystemRepository;

    public MasterSystemService(MasterSystemRepository masterSystemRepository) {
        this.masterSystemRepository = masterSystemRepository;
    }

    public List<MasterSystem> getAllMasterSystems() {
        return masterSystemRepository.findAll();
    }

    public Optional<MasterSystem> getMasterSystemById(Long id) {
        return masterSystemRepository.findById(id);
    }

    public MasterSystem createMasterSystem(MasterSystem masterSystem) {
        return masterSystemRepository.save(masterSystem);
    }

    public MasterSystem updateMasterSystem(Long id, MasterSystem updatedSystem) {
        Optional<MasterSystem> existingSystem = masterSystemRepository.findById(id);
        if (existingSystem.isPresent()) {
            MasterSystem system = existingSystem.get();
            system.setSystemName(updatedSystem.getSystemName());
            system.setUpdateAt(updatedSystem.getUpdateAt());
            system.setUpdateBy(updatedSystem.getUpdateBy());
            system.setVersion(updatedSystem.getVersion());
            return masterSystemRepository.save(system);
        }
        return null; // Hata işleme eklenebilir
    }

    public void deleteMasterSystem(Long id) {
        masterSystemRepository.deleteById(id);
    }
}
