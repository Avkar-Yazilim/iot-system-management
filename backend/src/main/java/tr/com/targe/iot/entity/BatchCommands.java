package tr.com.targe.iot.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;
import java.util.List;
import java.time.LocalDateTime;
    

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

    @Column(name = "priority", nullable = false)
    private Integer priority;

    @ManyToOne
    @JoinColumn(name = "device_id", nullable = false)
    private Device device;

    @Column(name = "device_id", nullable = false,updatable = false,insertable = false)
    private Long deviceId;

    @ManyToMany
    @JoinTable(
            name = "Batch_Commands_Sensor_Value_Plan",
            joinColumns = @JoinColumn(name = "command_id"),
            inverseJoinColumns = @JoinColumn(name = "plan_id")
    )

    private List<SensorValuePlan> sensorValuePlans;

    public LocalDateTime getTimestamp() {
        return timestamp.toLocalDateTime();
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = Timestamp.valueOf(timestamp);
    }

}
