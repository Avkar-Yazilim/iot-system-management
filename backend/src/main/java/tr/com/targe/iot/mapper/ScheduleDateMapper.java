package tr.com.targe.iot.mapper;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import tr.com.targe.iot.DTO.ScheduleDateDTO;
import tr.com.targe.iot.entity.ScheduleDate;

@Component
@RequiredArgsConstructor
public class ScheduleDateMapper {
    
    public ScheduleDateDTO toDTO(ScheduleDate scheduleDate) {
        if (scheduleDate == null) return null;
        ScheduleDateDTO dto = new ScheduleDateDTO();
        dto.setScheduleDateId(scheduleDate.getScheduleDateId());
        dto.setScheduleId(scheduleDate.getSchedule().getScheduleId());
        dto.setStartTime(scheduleDate.getStartTime());
        dto.setStatus(scheduleDate.getStatus());
        dto.setEventTitle(scheduleDate.getSchedule().getEventTitle());
        return dto;
    }
}

