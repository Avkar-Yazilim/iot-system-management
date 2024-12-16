package tr.com.targe.iot.controller;

import tr.com.targe.iot.service.ScheduleDateService;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import tr.com.targe.iot.DTO.ScheduleDateDTO;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/schedule-dates")
@CrossOrigin(origins = "http://localhost:5173")
public class ScheduleDateController {

    private final ScheduleDateService scheduleDateService;

    @GetMapping
    public List<ScheduleDateDTO> getAllScheduleDates() {
        return scheduleDateService.getAllScheduleDates();
    }

}
