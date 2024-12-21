package tr.com.targe.iot.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "Sensor_Values")
public class SensorValues {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sensor_data_id")
    private Long sensorDataId;

    @ManyToOne
    @JoinColumn(name = "device_id", nullable = false)
    private Device device;

    @Column(name = "sensor_type", nullable = false)
    private String sensorType;

    @Column(name = "update_at", nullable = false)
    private LocalDateTime updateAt;

    @Column(name = "data_key", nullable = false)
    private String dataKey;

    @Column(name = "data_value", nullable = false)
    private String dataValue;

    @Column(name = "unit", nullable = false)
    private String unit;

    // Getters and Setters

    public Long getDeviceId() {
        return device != null ? device.getDeviceId() : null; // deviceId'ye erişim
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    public void setDeviceId(Long deviceId) {
        if (this.device == null) {
            this.device = new Device();
        }
        this.device.setDeviceId(deviceId);
    }  
}
