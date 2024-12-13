package tr.com.targe.iot.DTO;

import lombok.Data;
import java.time.LocalDateTime;


@Data
public class DeviceDTO {
    private Long deviceId;
    private Long systemId; // SubSystem için ID
    private String deviceName;
    private String deviceType;
    private String deviceStatus;
    private LocalDateTime createAt;
    private String createBy;
    private LocalDateTime updateAt;
    private String updateBy;
    private String version;
}
