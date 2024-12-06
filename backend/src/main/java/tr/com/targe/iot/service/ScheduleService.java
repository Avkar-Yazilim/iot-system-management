package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.targe.iot.entity.Schedule;
import tr.com.targe.iot.entity.Schedule.Status;
import tr.com.targe.iot.repository.ScheduleRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    
    
    private final ScheduleRepository scheduleRepository;

    //Constructor Injection
    @Autowired
    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    // Create schedule
    public Schedule createSchedule(Schedule schedule) {
        schedule.setCreatedAt(LocalDateTime.now());   // Set the creation date
        schedule.setStatus(Status.ACTIVE);            // Set the status as ACTIVE  
        return scheduleRepository.save(schedule);
    }

    //Get a schedule by ID
    public Optional<Schedule> getScheduleById(Long id) {
        return scheduleRepository.findById(id);
    }

    //Get all schedules
    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }


    //update an existing schedule
    @Transactional
    public Schedule updateSchedule(Long scheduleId, Schedule updatedSchedule) {

        Schedule existingSchedule = scheduleRepository.findById(scheduleId).orElseThrow(() -> new IllegalArgumentException("Invalid Schedule ID")); 
        
        existingSchedule.setGroup(updatedSchedule.getGroup());
        existingSchedule.setDevice(updatedSchedule.getDevice());
        existingSchedule.setCommand(updatedSchedule.getCommand());
        existingSchedule.setRequest(updatedSchedule.getRequest());
        existingSchedule.setEventTitle(updatedSchedule.getEventTitle());
        existingSchedule.setRecurrence(updatedSchedule.getRecurrence());
        existingSchedule.setUpdatedAt(LocalDateTime.now());
        existingSchedule.setUpdatedBy(updatedSchedule.getUpdatedBy());
        existingSchedule.setUntilDate(updatedSchedule.getUntilDate());

        return scheduleRepository.save(existingSchedule);
    }

    //Delete a schedule by marking it as INACTIVE
    @Transactional
    public void deleteSchedule(Long id, String deletedBy) {
        Schedule schedule = scheduleRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid Schedule ID"));
        schedule.setStatus(Status.INACTIVE);
        schedule.setDeletedAt(LocalDateTime.now());
        schedule.setDeletedBy(deletedBy);
        schedule.setUpdatedAt(LocalDateTime.now());
        schedule.setUpdatedBy(deletedBy);
        scheduleRepository.save(schedule);
    }

    
    //Find schedules by status
    public List<Schedule> getSchedulesByStatus(Status status) {
        return scheduleRepository.findSchedulesByStatus(status);
    }

    //Activate a schedule
    @Transactional
    public void activateSchedule(Long id, String activatedBy) {
        Schedule schedule = scheduleRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid Schedule ID"));
        schedule.setStatus(Status.ACTIVE);
        schedule.setUpdatedAt(LocalDateTime.now());
        schedule.setUpdatedBy(activatedBy);
        scheduleRepository.save(schedule);
    }
    // Complete a schedule
    @Transactional
    public Schedule completeSchedule(Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow(() -> new RuntimeException("Schedule not found with ID: " + scheduleId));
        
        schedule.setStatus(Status.COMPLETED);
        schedule.setUpdatedAt(LocalDateTime.now());
        return scheduleRepository.save(schedule);
    }
}
