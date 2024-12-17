package tr.com.targe.iot.mapper;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import tr.com.targe.iot.DTO.ScheduleDTO;
import tr.com.targe.iot.entity.Schedule;

@Component
@RequiredArgsConstructor
public class ScheduleMapper {

    public ScheduleDTO toDTO(Schedule schedule) {
        if (schedule == null) return null;
        ScheduleDTO dto = new ScheduleDTO();
        dto.setScheduleId(schedule.getScheduleId());
        dto.setDeviceId(schedule.getDeviceId());
        dto.setCommandId(schedule.getCommandId());
        dto.setEventTitle(schedule.getEventTitle());
        dto.setScheduleDays(schedule.getScheduleDays());
        dto.setRecurrence(schedule.getRecurrence());
        dto.setInterval(schedule.getInterval());
        dto.setStartTime(schedule.getStartTime());
        dto.setEndTime(schedule.getEndTime());
        dto.setUntilDate(schedule.getUntilDate());
        dto.setStatus(schedule.getStatus());
        dto.setCreateAt(schedule.getCreateAt());
        dto.setCreateBy(schedule.getCreateBy());
        return dto;
    }

    public Schedule toEntity(ScheduleDTO dto) {
        if (dto == null) return null;
        Schedule entity = new Schedule();
        entity.setDeviceId(dto.getDeviceId());
        entity.setCommandId(dto.getCommandId());
        entity.setEventTitle(dto.getEventTitle());
        entity.setRecurrence(dto.getRecurrence());
        entity.setInterval(dto.getInterval());
        entity.setStartTime(dto.getStartTime());
        entity.setEndTime(dto.getEndTime());
        entity.setUntilDate(dto.getUntilDate());
        entity.setStatus(dto.getStatus());
        entity.setCreateAt(dto.getCreateAt());
        entity.setCreateBy(dto.getCreateBy());
        entity.setScheduleDays(dto.getScheduleDays());

        return entity;
    }
}

