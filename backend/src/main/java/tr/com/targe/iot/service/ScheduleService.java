package tr.com.targe.iot.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import tr.com.targe.iot.DTO.ScheduleDTO;
import tr.com.targe.iot.entity.Schedule;
import tr.com.targe.iot.entity.ScheduleDate;
import tr.com.targe.iot.repository.ScheduleRepository;
import tr.com.targe.iot.repository.ScheduleDateRepository;
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
    
    @Autowired
    private ScheduleDateRepository scheduleDateRepository;

    // Get schedule by id
    public ScheduleDTO getScheduleById(Long id) {
        Schedule schedule = scheduleRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Schedule not found with id: " + id));
        return scheduleMapper.toDTO(schedule);
    }

    // Create schedule
    public ScheduleDTO createSchedule(ScheduleDTO scheduleDTO) {
        if (scheduleDTO.getDeviceId() == null) {
            throw new IllegalArgumentException("Device ID cannot be null");
        }

        Schedule schedule = scheduleMapper.toEntity(scheduleDTO);
        
        // Varsayılan değerleri ayarla
        if (scheduleDTO.getCreateAt() == null) {
            schedule.setCreateAt(LocalDateTime.now());
        }
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
    public ScheduleDTO updateSchedule(Long scheduleId, ScheduleDTO scheduleDTO) {
        // Mevcut schedule'ı bul
        Schedule existingSchedule = scheduleRepository.findById(scheduleId)
            .orElseThrow(() -> new IllegalArgumentException("Schedule not found with id: " + scheduleId));

        // Mevcut create_at tarihini sakla
        LocalDateTime originalCreateAt = existingSchedule.getCreateAt();
        String originalCreateBy = existingSchedule.getCreateBy();

        // Yeni schedule bilgilerini set et
        Schedule updatedSchedule = scheduleMapper.toEntity(scheduleDTO);
        updatedSchedule.setScheduleId(scheduleId);
        updatedSchedule.setCreateAt(originalCreateAt);
        updatedSchedule.setCreateBy(originalCreateBy);
        updatedSchedule.setUpdateAt(LocalDateTime.now());
        
        // Schedule'ı kaydet
        Schedule savedSchedule = scheduleRepository.save(updatedSchedule);
        return scheduleMapper.toDTO(savedSchedule);
    }

    //Delete a schedule
    @Transactional
    public void deleteSchedule(Long id, String deletedBy) {
        scheduleRepository.deleteById(id);
    }

    
    @Transactional
    public void deactivateSchedule(Long id, String deletedBy) {
        Schedule schedule = scheduleRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Schedule not found with id: " + id));
        
        // Schedule'ı pasif yap
        schedule.setStatus("Inactive");
        schedule.setDeleteAt(LocalDateTime.now());
        schedule.setDeleteBy(deletedBy);
        schedule.setUpdateAt(LocalDateTime.now());
        schedule.setUpdateBy(deletedBy);
        scheduleRepository.save(schedule);

        // İlgili schedule_date'leri pasif yap
        List<ScheduleDate> scheduleDates = scheduleDateRepository.findByScheduleId(id);
        for (ScheduleDate scheduleDate : scheduleDates) {
            scheduleDate.setStatus("Inactive");
        }
        scheduleDateRepository.saveAll(scheduleDates);
    }

    //Activate a schedule
    @Transactional
    public void activateSchedule(Long id, String activatedBy) {
        Schedule schedule = scheduleRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Schedule not found with id: " + id));
        
        // Schedule'ı aktif yap
        schedule.setStatus("Active");
        schedule.setUpdateAt(LocalDateTime.now());
        schedule.setUpdateBy(activatedBy);
        schedule.setDeleteAt(null);
        schedule.setDeleteBy(null);
        scheduleRepository.save(schedule);

        // İlgili schedule_date'leri aktif yap
        List<ScheduleDate> scheduleDates = scheduleDateRepository.findByScheduleId(id);
        for (ScheduleDate scheduleDate : scheduleDates) {
            scheduleDate.setStatus("Active");
        }
        scheduleDateRepository.saveAll(scheduleDates);
    }

}
