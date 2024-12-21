package tr.com.targe.iot.DTO;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class SensorValuesDTO {
    private Long sensorDataId;
    private Long deviceId;
    private String sensorType;
    private LocalDateTime updateAt;
    private String dataKey;
    private String dataValue;
    private String unit;
}
