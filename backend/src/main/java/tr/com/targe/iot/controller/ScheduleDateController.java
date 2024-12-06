package tr.com.targe.iot.controller;

import tr.com.targe.iot.entity.ScheduleDate;
import tr.com.targe.iot.service.ScheduleDateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/schedule-dates")
public class ScheduleDateController {

    private final ScheduleDateService scheduleDateService;

    public ScheduleDateController(ScheduleDateService scheduleDateService) {
        this.scheduleDateService = scheduleDateService;
    }

    @GetMapping
    public List<ScheduleDate> getAllScheduleDates() {
        return scheduleDateService.getAllScheduleDates();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScheduleDate> getScheduleDateById(@PathVariable Long id) {
        Optional<ScheduleDate> scheduleDate = scheduleDateService.getScheduleDateById(id);
        return scheduleDate.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ScheduleDate> createScheduleDate(@RequestBody ScheduleDate scheduleDate) {
        ScheduleDate createdScheduleDate = scheduleDateService.createScheduleDate(scheduleDate);
        return ResponseEntity.status(201).body(createdScheduleDate);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ScheduleDate> updateScheduleDate(@PathVariable Long id, @RequestBody ScheduleDate updatedScheduleDate) {
        ScheduleDate scheduleDate = scheduleDateService.updateScheduleDate(id, updatedScheduleDate);
        if (scheduleDate != null) {
            return ResponseEntity.ok(scheduleDate);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScheduleDate(@PathVariable Long id) {
        scheduleDateService.deleteScheduleDate(id);
        return ResponseEntity.noContent().build(); 
    }
}
