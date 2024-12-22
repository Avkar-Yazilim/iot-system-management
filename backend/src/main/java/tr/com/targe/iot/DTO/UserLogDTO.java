package tr.com.targe.iot.DTO;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class UserLogDTO {
    private Long userId;
    private String userName;
    private String action;
    private LocalDateTime timestamp;
}
    