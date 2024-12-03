package tr.com.targe.iot.entity;
import jakarta.persistence.*;
import java.sql.Timestamp;

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
}
