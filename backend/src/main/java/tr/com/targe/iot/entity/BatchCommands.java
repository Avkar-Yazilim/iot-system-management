package tr.com.targe.iot.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;
import java.time.LocalDateTime;
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

}
