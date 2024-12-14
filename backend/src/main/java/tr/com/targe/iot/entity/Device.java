package tr.com.targe.iot.entity;

import jakarta.persistence.*;
import tr.com.targe.iot.entity.SubSystem;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter 
@Entity
@Table(name = "Device")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_id")
    private Long deviceId;

    @ManyToOne
    @JoinColumn(name = "system_id")
    private SubSystem subSystem;     

    @Column(name = "system_id", nullable = false, insertable = false,updatable = false)
    private Long systemId;

    @Column(name = "device_name", length = 20, nullable = false)
    private String deviceName;

    @Column(name = "device_type", length = 20, nullable = false)
    private String deviceType;

    @Column(name = "device_status", length = 25, nullable = false)
    private String deviceStatus = "INACTIVE";

    @Column(name = "create_at", nullable = false)
    private LocalDateTime createAt = LocalDateTime.now();

    @Column(name = "create_by", length = 25, nullable = false)
    private String createBy;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @Column(name = "update_by", length = 25)
    private String updateBy;

    @Column(name = "delete_at")
    private LocalDateTime deleteAt;

    @Column(name = "delete_by", length = 25)
    private String deleteBy;

    @Column(name = "version", length = 25, nullable = false)
    private String version;

    @ManyToMany(mappedBy = "devices")
    private List<DeviceGroup> deviceGroups;

    @ManyToMany
    @JoinTable(
        name = "Device_Sensor_Value_Plan",
        joinColumns = @JoinColumn(name = "device_id"),
        inverseJoinColumns = @JoinColumn(name = "plan_id")
    )
    private List<SensorValuePlan> sensorValuePlans;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "deleted_by")
    private String deletedBy;

    public void setSystemId(Long systemId) {
        this.systemId = systemId;
    }

    public Long getSystemId() {
        return systemId;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    public String getDeletedBy() {
        return deletedBy;
    }

    public void setDeletedBy(String deletedBy) {
        this.deletedBy = deletedBy;
    }
}
