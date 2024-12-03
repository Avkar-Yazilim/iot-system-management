package tr.com.targe.iot.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "Sensor_Value_Plan")
public class SensorValuePlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plan_id", nullable = false)
    private Long planId;

    @OneToOne
    @JoinColumn(name = "sensor_data_id", nullable = false)
    private SensorValues sensorValues;

    @Column(name = "min_value", length = 255, nullable = true)
    private String minValue;

    @Column(name = "max_value", length = 255, nullable = true)
    private String maxValue;

    @Column(name = "create_at", nullable = false, updatable = false)
    private LocalDateTime createAt;

    @Column(name = "create_by", length = 25, nullable = false, updatable = false)
    private String createBy;

    @Column(name = "update_at", nullable = true)
    private LocalDateTime updateAt;

    @Column(name = "update_by", length = 25, nullable = true)
    private String updateBy;

    @Column(name = "delete_at", nullable = true)
    private LocalDateTime deleteAt;

    @Column(name = "delete_by", length = 25, nullable = true)
    private String deleteBy;

    @Column(name = "action", length = 255, nullable = true)
    private String action;

    @ManyToMany(mappedBy = "sensorValuePlans")
    private List<Device> devices;

    // Getters and Setters
    public Long getPlanId() {
        return planId;
    }

    public void setPlanId(Long planId) {
        this.planId = planId;
    }

    public SensorValues getSensorValues() {
        return sensorValues;
    }

    public void setSensorValues(SensorValues sensorValues) {
        this.sensorValues = sensorValues;
    }

    public String getMinValue() {
        return minValue;
    }

    public void setMinValue(String minValue) {
        this.minValue = minValue;
    }

    public String getMaxValue() {
        return maxValue;
    }

    public void setMaxValue(String maxValue) {
        this.maxValue = maxValue;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public LocalDateTime getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(LocalDateTime updateAt) {
        this.updateAt = updateAt;
    }

    public String getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }

    public LocalDateTime getDeleteAt() {
        return deleteAt;
    }

    public void setDeleteAt(LocalDateTime deleteAt) {
        this.deleteAt = deleteAt;
    }

    public String getDeleteBy() {
        return deleteBy;
    }

    public void setDeleteBy(String deleteBy) {
        this.deleteBy = deleteBy;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
