package tr.com.targe.iot.mapper;

import org.springframework.stereotype.Component;

import tr.com.targe.iot.DTO.SubSystemDTO;
import tr.com.targe.iot.entity.SubSystem;

@Component
public class SubSystemMapper {
    
    public SubSystemDTO toDTO(SubSystem subSystem) {
        if (subSystem == null) return null;
        
        SubSystemDTO dto = new SubSystemDTO();
        dto.setId(subSystem.getSystemId());
        dto.setName(subSystem.getSystemName());
        dto.setVersion(subSystem.getVersion());
        return dto;
    }

    public SubSystem toEntity(SubSystemDTO dto) {
        if (dto == null) return null;
        
        SubSystem subSystem = new SubSystem();
        subSystem.setSystemId(dto.getId());
        subSystem.setSystemName(dto.getName());
        subSystem.setVersion(dto.getVersion());
        return subSystem;
    }
}


