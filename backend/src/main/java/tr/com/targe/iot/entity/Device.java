package tr.com.targe.iot.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter 
@Entity
@Table(name = "Device")
public class Device {
    @Id
    @Column(name = "device_id")
    private Long deviceId;

    @Column(name = "system_id")
    private Long systemId = 1L;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "system_id", insertable = false, updatable = false)
    private SubSystem subSystem;

    @Column(name = "device_name", length = 20, nullable = false)
    private String deviceName;

    @Column(name = "device_type", length = 20, nullable = false)
    private String deviceType;

    @Column(name = "device_status", length = 25, nullable = false)
    private String deviceStatus;

    @Column(name = "create_at", nullable = false)
    private LocalDateTime createAt = LocalDateTime.now();

    @Column(name = "create_by", length = 25, nullable = false)
    private String createBy = "admin";

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @Column(name = "update_by", length = 25)
    private String updateBy;

    @Column(name = "delete_at")
    private LocalDateTime deleteAt;

    @Column(name = "delete_by", length = 25)
    private String deleteBy;

    @Column(name = "version", length = 25, nullable = false)
    private String version = "1.0";

    @ManyToMany(mappedBy = "devices")
    private List<DeviceGroup> deviceGroups;

    @ManyToMany
    @JoinTable(
        name = "Device_Sensor_Value_Plan",
        joinColumns = @JoinColumn(name = "device_id"),
        inverseJoinColumns = @JoinColumn(name = "plan_id")
    )
    private List<SensorValuePlan> sensorValuePlans;

    @PrePersist
    public void prePersist() {
        if (this.systemId == null) {
            this.systemId = 1L;
        }
    }

    public void setSystemId(Long systemId) {
        this.systemId = systemId;
    }

    public Long getSystemId() {
        return systemId;
    }
}
