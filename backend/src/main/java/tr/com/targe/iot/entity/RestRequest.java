package tr.com.targe.iot.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "Rest_Request")
public class RestRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long requestId;

    @Column(name = "endpoint", nullable = false)
    private String endpoint;

    @Column(name = "method", nullable = false)
    private String method;

    @Column(name = "headers", nullable = false)
    private String headers;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "response_code")
    private Integer responseCode;

    @Column(name = "payload")
    private String payload;

    @Column(name = "response_body")
    private String responseBody;

    @Column(name = "timeout")
    private Integer timeout;

    @Column(name = "rest_status", nullable = false)
    private String restStatus;

    @ManyToMany
    @JoinTable(
            name = "Rest_Request_Sensor_Value_Plan",
            joinColumns = @JoinColumn(name = "request_id"),
            inverseJoinColumns = @JoinColumn(name = "plan_id")
    )
    private List<SensorValuePlan> sensorValuePlans;

    // Getters and Setters
}
