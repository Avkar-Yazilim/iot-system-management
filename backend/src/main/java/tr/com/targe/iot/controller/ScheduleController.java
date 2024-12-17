package tr.com.targe.iot.controller;

import tr.com.targe.iot.DTO.ScheduleDTO;
import tr.com.targe.iot.entity.Schedule;
import tr.com.targe.iot.service.ScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ScheduleController {

    private final ScheduleService scheduleService;
    


    @GetMapping
    public List<ScheduleDTO> getAllSchedules() {
        return scheduleService.getAllSchedules();
    }

    @PostMapping
    public ResponseEntity<ScheduleDTO> createSchedule(@RequestBody ScheduleDTO scheduleDTO) {
        ScheduleDTO schedule = scheduleService.createSchedule(scheduleDTO);
        return ResponseEntity.status(201).body(schedule); 
    }

    @PutMapping("/{id}")
    public ResponseEntity<Schedule> updateSchedule(@PathVariable Long id, @RequestBody Schedule updatedSchedule) {
        Schedule schedule = scheduleService.updateSchedule(id, updatedSchedule);
        if (schedule != null) {
            return ResponseEntity.ok(schedule);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id, @RequestParam String deletedBy) {
        scheduleService.deleteSchedule(id, deletedBy);
        return ResponseEntity.noContent().build(); 
    }
}
