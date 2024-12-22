package tr.com.targe.iot.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tr.com.targe.iot.DTO.ScheduleDTO;
import tr.com.targe.iot.entity.Schedule;
import tr.com.targe.iot.repository.ScheduleRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import tr.com.targe.iot.mapper.ScheduleMapper;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final ScheduleMapper scheduleMapper;
    // Create schedule
    public ScheduleDTO createSchedule(ScheduleDTO scheduleDTO) {
        if (scheduleDTO.getDeviceId() == null) {
            throw new IllegalArgumentException("Device ID cannot be null");
        }

        Schedule schedule = scheduleMapper.toEntity(scheduleDTO);
        
        // Varsayılan değerleri ayarla
        schedule.setCreateAt(LocalDateTime.now());
        schedule.setCreateBy(scheduleDTO.getCreateBy() != null ? scheduleDTO.getCreateBy() : "admin");
        schedule.setStatus("Active");
        
        // Device ID'yi açıkça set et
        schedule.setDeviceId(scheduleDTO.getDeviceId());
        schedule.setCommandId(scheduleDTO.getCommandId());
        
        // Eğer version belirtilmemişse varsayılan versiyon ata
        if (schedule.getVersion() == null) {
            schedule.setVersion("v1.0");
        }
        
        Schedule savedSchedule = scheduleRepository.save(schedule);
        return scheduleMapper.toDTO(savedSchedule);
    }

    //Get all schedules
    public List<ScheduleDTO> getAllSchedules() {
        return scheduleRepository.findAll().stream()
            .map(scheduleMapper::toDTO)
            .collect(Collectors.toList());
    }


    //update an existing schedule
    @Transactional
    public Schedule updateSchedule(Long scheduleId, Schedule updatedSchedule) {

        Schedule existingSchedule = scheduleRepository.findById(scheduleId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid Schedule ID")); 
        
        existingSchedule.setGroup(updatedSchedule.getGroup());
        existingSchedule.setDevice(updatedSchedule.getDevice());
        existingSchedule.setBatchCommands(updatedSchedule.getBatchCommands());
        existingSchedule.setRequest(updatedSchedule.getRequest());
        existingSchedule.setEventTitle(updatedSchedule.getEventTitle());
        existingSchedule.setRecurrence(updatedSchedule.getRecurrence());
        existingSchedule.setUpdateAt(LocalDateTime.now());
        existingSchedule.setUpdateBy(updatedSchedule.getUpdateBy());
        existingSchedule.setUntilDate(updatedSchedule.getUntilDate());

        return scheduleRepository.save(existingSchedule);
    }

    //Delete a schedule
    @Transactional
    public void deleteSchedule(Long id, String deletedBy) {
        scheduleRepository.deleteById(id);
    }


    //Activate a schedule
    @Transactional
    public void activateSchedule(Long id, String activatedBy) {
        Schedule schedule = scheduleRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid Schedule ID"));
        schedule.setStatus("Active");
        schedule.setUpdateAt(LocalDateTime.now());
        schedule.setUpdateBy(activatedBy);
        scheduleRepository.save(schedule);
    }
    // Complete a schedule
    @Transactional
    public Schedule completeSchedule(Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
            .orElseThrow(() -> new RuntimeException("Schedule not found with ID: " + scheduleId));
        
        schedule.setStatus("Completed");
        schedule.setUpdateAt(LocalDateTime.now());
        return scheduleRepository.save(schedule);
    }
}
