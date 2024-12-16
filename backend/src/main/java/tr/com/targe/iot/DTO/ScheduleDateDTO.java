package tr.com.targe.iot.DTO;

import java.time.LocalDateTime;

import lombok.Data;

@Data   
public class ScheduleDateDTO {
    private Long scheduleDateId;
    private Long scheduleId;
    private LocalDateTime startTime;
    private String eventTitle;
    private String status;

}
