package tr.com.targe.iot.DTO;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeviceLogDTO {
    private Long deviceId;
    private Long logId;
    private String message;
    private LocalDateTime timestamp;
}
