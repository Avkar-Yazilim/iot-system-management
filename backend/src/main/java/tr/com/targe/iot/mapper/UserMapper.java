package tr.com.targe.iot.mapper;

import org.springframework.stereotype.Component;
import tr.com.targe.iot.DTO.UserDTO;
import tr.com.targe.iot.entity.User;

@Component
public class UserMapper {
    public UserDTO toDTO(User user) {
        if (user == null) return null;
        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setUsername(user.getUsername());
        dto.setPasswordHash(user.getPasswordHash());
        dto.setEmail(user.getEmail());
        dto.setUserAuthorization(user.getUserAuthorization());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        return dto;
    }

    public User toEntity(UserDTO dto) {
        if (dto == null) return null;
        User entity = new User();
        entity.setUserId(dto.getUserId());
        entity.setUsername(dto.getUsername());
        entity.setPasswordHash(dto.getPasswordHash());
        entity.setEmail(dto.getEmail());
        entity.setUserAuthorization(dto.getUserAuthorization());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        return entity;
    }
}


