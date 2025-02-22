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
    public ResponseEntity<List<ScheduleDTO>> getAllSchedules() {
        return ResponseEntity.ok(scheduleService.getAllSchedules());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScheduleDTO> getScheduleById(@PathVariable Long id) {
        ScheduleDTO schedule = scheduleService.getScheduleById(id);
        return ResponseEntity.ok(schedule);
    }

    @PostMapping
    public ResponseEntity<?> createSchedule(@RequestBody ScheduleDTO scheduleDTO) {
        try {
            System.out.println("Received schedule creation request: " + scheduleDTO.toString());
            ScheduleDTO schedule = scheduleService.createSchedule(scheduleDTO);
            return ResponseEntity.status(201).body(schedule);
        } catch (Exception e) {
            System.err.println("Error creating schedule: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500)
                .body("Error creating schedule: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ScheduleDTO> updateSchedule(@PathVariable Long id, @RequestBody ScheduleDTO scheduleDTO) {
        ScheduleDTO updatedSchedule = scheduleService.updateSchedule(id, scheduleDTO);
        return ResponseEntity.ok(updatedSchedule);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id, @RequestParam String deletedBy) {
        scheduleService.deleteSchedule(id, deletedBy);
        return ResponseEntity.noContent().build(); 
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateSchedule(@PathVariable Long id, @RequestParam String deletedBy) {
        scheduleService.deactivateSchedule(id, deletedBy);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/activate")
    public ResponseEntity<Void> activateSchedule(@PathVariable Long id, @RequestParam String activatedBy) {
        scheduleService.activateSchedule(id, activatedBy);
        return ResponseEntity.noContent().build();
    }
}
