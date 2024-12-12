package tr.com.targe.iot.service;

import org.springframework.stereotype.Service;
import tr.com.targe.iot.entity.SubSystem;
import tr.com.targe.iot.repository.SubSystemRepository;
import java.util.List;
import java.util.Optional;

@Service
public class SubSystemService {
    private final SubSystemRepository subSystemRepository;

    public SubSystemService(SubSystemRepository subSystemRepository) {
        this.subSystemRepository = subSystemRepository;
    }

    public List<SubSystem> getAllSubSystems() {
        return subSystemRepository.findAll();
    }

    public Optional<SubSystem> getSubSystemById(Long id) {
        return subSystemRepository.findById(id);
    }

    public SubSystem createSubSystem(SubSystem subSystem) {
        return subSystemRepository.save(subSystem);
    }

    public SubSystem updateSubSystem(Long id, SubSystem updatedSubSystem) {
        if (subSystemRepository.existsById(id)) {
            updatedSubSystem.setSystemId(id);
            return subSystemRepository.save(updatedSubSystem);
        }
        return null;
    }

    public void deleteSubSystem(Long id) {
        subSystemRepository.deleteById(id);
    }
}
