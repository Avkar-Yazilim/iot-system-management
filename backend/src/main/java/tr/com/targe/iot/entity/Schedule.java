package tr.com.targe.iot.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Schedules")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Integer scheduleId;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private DeviceGroup group_id;

    @ManyToOne
    @JoinColumn(name = "device_id")
    private Device device_id;

    @ManyToOne
    @JoinColumn(name = "command_id", nullable = false)
    private BatchCommands command_id;

    @ManyToOne
    @JoinColumn(name = "request_id", nullable = false)
    private RestRequest request_id;

    @Column(name = "event_title", nullable = false)
    private String eventTitle;

    @Column(name = "recurrence")
    @Enumerated(EnumType.STRING)
    private Recurrence recurrence;

    @Column(name = "interval")
    private Integer interval;

    @Column(name = "schedule_days")
    private String scheduleDays;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "until_date")
    private LocalDateTime untilDate;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;

    @Column(name = "create_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "create_by", nullable = false, length = 25)
    private String createdBy;

    @Column(name = "update_at")
    private LocalDateTime updatedAt;

    @Column(name = "update_by", length = 25)
    private String updatedBy;

    @Column(name = "delete_at")
    private LocalDateTime deletedAt;

    @Column(name = "delete_by", length = 25)
    private String deletedBy;

    @Column(name = "version", nullable = false, length = 25)
    private String version;

    // Enum for Recurrence
    public enum Recurrence {
        DAILY, WEEKLY, MONTHLY, YEARLY
    }

    // Enum for Status
    public enum Status {
        ACTIVE, INACTIVE, COMPLETED, CANCELLED
    }

    // Getters and Setters
    public Integer getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Integer scheduleId) {
        this.scheduleId = scheduleId;
    }

    public DeviceGroup getGroup() {
        return group_id;
    }

    public void setGroup(DeviceGroup group_id) {
        this.group_id = group_id;
    }

    public Device getDevice() {
        return device_id;
    }

    public void setDevice(Device device_id) {
        this.device_id = device_id;
    }

    public BatchCommands getCommand() {
        return command_id;
    }

    public void setCommand(BatchCommands command_id) {
        this.command_id = command_id;
    }

    public RestRequest getRequest() {
        return request_id;
    }

    public void setRequest(RestRequest request_id) {
        this.request_id = request_id;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    public Recurrence getRecurrence() {
        return recurrence;
    }

    public void setRecurrence(Recurrence recurrence) {
        this.recurrence = recurrence;
    }

    public Integer getInterval() {
        return interval;
    }

    public void setInterval(Integer interval) {
        this.interval = interval;
    }

    public String getScheduleDays() {
        return scheduleDays;
    }

    public void setScheduleDays(String scheduleDays) {
        this.scheduleDays = scheduleDays;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getUntilDate() {
        return untilDate;
    }

    public void setUntilDate(LocalDateTime untilDate) {
        this.untilDate = untilDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
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

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
    
}
