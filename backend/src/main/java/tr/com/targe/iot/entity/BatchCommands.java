package tr.com.targe.iot.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Batch_Commands")
public class BatchCommands {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "command_id")
    private Long commandId;

    @Column(name = "command", length = 25, nullable = false)
    private String command;

    @Column(name = "timestamp", nullable = false)
    private Timestamp timestamp;

    @Column(name = "command_status", length = 20, nullable = false)
    private String commandStatus;

    @Column(name = "feedback", length = 255, nullable = false)
    private String feedback;

    @Column(name = "priority",nullable = false)
    private Integer priority;

    @ManyToMany
    @JoinTable(
            name = "Batch_Commands_Sensor_Value_Plan",
            joinColumns = @JoinColumn(name = "command_id"),
            inverseJoinColumns = @JoinColumn(name = "plan_id")
    )

    private List<SensorValuePlan> sensorValuePlans;

        // Getters and Setters

        public Long getCommandId() {
            return commandId;
        }
    
        public void setCommandId(Long commandId) {
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

        public Integer getPriority() {
            return priority;
        }

        public void setPriority(Integer priority) {
            this.priority = priority;
        }

}
