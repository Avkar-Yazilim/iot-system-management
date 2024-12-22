package tr.com.targe.iot.mapper;

import org.springframework.stereotype.Component;

import tr.com.targe.iot.DTO.UserLogDTO;
import tr.com.targe.iot.entity.UserLog;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserLogMapper {

    public UserLogDTO toDTO(UserLog userLog) {
        if (userLog == null) return null;
        UserLogDTO dto = new UserLogDTO();
        dto.setUserId(userLog.getUserId());
        dto.setUserName(userLog.getUser().getUsername());
        dto.setAction(userLog.getAction());
        dto.setTimestamp(userLog.getTimestamp());
        return dto;
    }
}