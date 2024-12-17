package tr.com.targe.iot.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Schedules")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Long scheduleId;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private DeviceGroup group;

    @Column(name = "group_id",insertable = false,updatable = false)
    private Long groupId;    

    @ManyToOne
    @JoinColumn(name = "device_id")
    private Device device;

    @Column(name = "device_id",insertable = false,updatable = false)
    private Long deviceId;

    @ManyToOne
    @JoinColumn(name = "command_id")
    private BatchCommands command;

    @Column(name = "command_id",insertable = false,updatable = false)
    private Long commandId;

    @ManyToOne
    @JoinColumn(name = "request_id")
    private RestRequest request;

    @Column(name = "request_id",insertable = false,updatable = false)
    private Long requestId;

    @Column(name = "event_title", nullable = false)
    private String eventTitle;

    @Column(name = "recurrence")
    private String recurrence;

    @Column(name = "interval")
    private Long interval;

    @Column(name = "schedule_days")
    private String scheduleDays;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "until_date")
    private LocalDateTime untilDate;

    @Column(name = "status", nullable = false)
    private String status = "Active";

    @Column(name = "create_at", nullable = false)
    private LocalDateTime createAt = LocalDateTime.now();

    @Column(name = "create_by", nullable = false, length = 25)
    private String createBy;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @Column(name = "update_by", length = 25)
    private String updateBy;

    @Column(name = "delete_at")
    private LocalDateTime deleteAt;

    @Column(name = "delete_by", length = 25)
    private String deleteBy;

    @Column(name = "version")
    private Long version;


    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public void setCommandId(Long commandId) {
        this.commandId = commandId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public Long getGroupId() {
        return groupId;
    }

    public Long getCommandId() {
        return commandId;
    }

    public Long getRequestId() {
        return requestId;
    }

    public void setInterval(Long interval) {
        this.interval = interval;
    }

    public Long getInterval() {
        return interval;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public Long getVersion() {
        return version;
    }
}
