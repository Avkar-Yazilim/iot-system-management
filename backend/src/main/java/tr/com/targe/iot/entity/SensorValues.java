package tr.com.targe.iot.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Sensor_Values")
public class SensorValues {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sensor_date_id")
    private Long sensorDataId;

    @ManyToOne
    @JoinColumn(name = "sensor_id", nullable = false)
    private Sensor sensor;

    @Column(name = "update_at", nullable = false)
    private LocalDateTime updateAt;

    @Column(name = "data_key", nullable = false)
    private String dataKey;

    @Column(name = "data_value", nullable = false)
    private String dataValue;

    @Column(name = "unit", nullable = false)
    private String unit;

    // Getters and Setters

    public Long getSensorDataId() {
        return sensorDataId;
    }

    public void setSensorId(Long sensorId) {
        this.sensorDataId = sensorId;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }

    public LocalDateTime getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(LocalDateTime updateAt) {
        this.updateAt = updateAt;
    }

    public String getDataKey() {
        return dataKey;
    }

    public void setDataKey(String dataKey) {
        this.dataKey = dataKey;
    }

    public String getDataValue() {
        return dataValue;
    }

    public void setDataValue(String dataValue) {
        this.dataValue = dataValue;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

}
