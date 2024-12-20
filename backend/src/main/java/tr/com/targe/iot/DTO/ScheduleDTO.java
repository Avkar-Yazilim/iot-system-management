package tr.com.targe.iot.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDTO {

    // Yeni alanlar
    private Long deviceId; // Cihaz ID'si
    private Long commandId; // Komut ID'si
    private Long scheduleId;
    private Long groupId;         
    private Long requestId;

    private String eventTitle;
    private String scheduleDays;
    private String recurrence;
    private Long interval;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDateTime untilDate;
    private String status;
    private LocalDateTime createAt;
    private String createBy;
    private String version;
    
    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

}
