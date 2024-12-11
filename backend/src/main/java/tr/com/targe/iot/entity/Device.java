package tr.com.targe.iot.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

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

    @Column(name = "device_name", length = 20, nullable = false)
    private String deviceName;

    @Column(name = "device_type", length = 20, nullable = false)
    private String deviceType;

    @Enumerated(EnumType.STRING) // Enum'un String olarak saklanmasını sağlar
    @Column(name = "device_status", length = 25, nullable = false)
    private DeviceStatus deviceStatus = DeviceStatus.INACTIVE;

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


    public enum DeviceStatus {
        ACTIVE,
        INACTIVE,
        OFFLINE,
        MAINTENANCE
    }
    @ManyToMany
    @JoinTable(
        name = "Device_Sensor_Value_Plan",
        joinColumns = @JoinColumn(name = "device_id"),
        inverseJoinColumns = @JoinColumn(name = "plan_id")
    )
    private List<SensorValuePlan> sensorValuePlans;

    // Getters and Setters

    public Long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
    }

    public SubSystem getSubSystem() {
        return subSystem;
    }

    public void setSubSystem(SubSystem subSystem) {
        this.subSystem = subSystem;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public DeviceStatus getDeviceStatus() {
        return deviceStatus;
    }

    public void setDeviceStatus(DeviceStatus deviceStatus) {
        this.deviceStatus = deviceStatus;
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

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public List<DeviceGroup> getDeviceGroups() {
        return deviceGroups;
    }

    public void setDeviceGroups(List<DeviceGroup> deviceGroups) {
        this.deviceGroups = deviceGroups;
    }
}
