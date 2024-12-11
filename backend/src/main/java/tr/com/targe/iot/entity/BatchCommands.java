package tr.com.targe.iot.entity;
import jakarta.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Batch_Commands")
public class BatchCommands {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "command_id")
    private Integer commandId;

    @Column(name = "command", length = 25, nullable = false)
    private String command;

    @Column(name = "timestamp", nullable = false)
    private Timestamp timestamp;

    @Column(name = "command_status", length = 20, nullable = false)
    private String commandStatus;

    @Column(name = "feedback", length = 255, nullable = false)
    private String feedback;

    @Column(name = "priority", length = 25, nullable = false)
    private String priority;

    @ManyToMany
    @JoinTable(
            name = "Batch_Commands_Sensor_Value_Plan",
            joinColumns = @JoinColumn(name = "command_id"),
            inverseJoinColumns = @JoinColumn(name = "plan_id")
    )

    private List<SensorValuePlan> sensorValuePlans;

    @Column(name = "create_at", nullable = false)
    private LocalDateTime createAt;

    @Column(name = "create_by", nullable = false)
    private String createBy;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @Column(name = "update_by")
    private String updateBy;

    @Column(name = "delete_at")
    private LocalDateTime deleteAt;

    @Column(name = "delete_by")
    private String deleteBy;

    // Getters and Setters
    public Integer getCommandId() {
        return commandId;
    }

    public void setCommandId(Integer commandId) {
        this.commandId = commandId;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public String getCommandStatus() {
        return commandStatus;
    }

    public void setCommandStatus(String commandStatus) {
        this.commandStatus = commandStatus;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public LocalDateTime getCreateAt() { return createAt; }
    public void setCreateAt(LocalDateTime createAt) { this.createAt = createAt; }
    
    public String getCreateBy() { return createBy; }
    public void setCreateBy(String createBy) { this.createBy = createBy; }
    
    public LocalDateTime getUpdateAt() { return updateAt; }
    public void setUpdateAt(LocalDateTime updateAt) { this.updateAt = updateAt; }
    
    public String getUpdateBy() { return updateBy; }
    public void setUpdateBy(String updateBy) { this.updateBy = updateBy; }
    
    public LocalDateTime getDeleteAt() { return deleteAt; }
    public void setDeleteAt(LocalDateTime deleteAt) { this.deleteAt = deleteAt; }
    
    public String getDeleteBy() { return deleteBy; }
    public void setDeleteBy(String deleteBy) { this.deleteBy = deleteBy; }
}
