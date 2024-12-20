package tr.com.targe.iot.mapper;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import tr.com.targe.iot.DTO.ScheduleDTO;
import tr.com.targe.iot.entity.BatchCommands;
import tr.com.targe.iot.entity.Device;
import tr.com.targe.iot.entity.Schedule;

@Component
@RequiredArgsConstructor
public class ScheduleMapper {

    public ScheduleDTO toDTO(Schedule schedule) {
        if (schedule == null) return null;
        ScheduleDTO dto = new ScheduleDTO();
        dto.setScheduleId(schedule.getScheduleId());
        dto.setDeviceId(schedule.getDevice() != null ? schedule.getDevice().getDeviceId() : null);
        dto.setCommandId(schedule.getBatchCommands() != null ? schedule.getBatchCommands().getCommandId() : null);
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

            Device device = new Device();
            device.setDeviceId(dto.getDeviceId());
            entity.setDevice(device);

            BatchCommands batchCommands = new BatchCommands();
            batchCommands.setCommandId(dto.getCommandId());
            entity.setBatchCommands(batchCommands);

        return entity;
    }
}

