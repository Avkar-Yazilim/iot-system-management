package tr.com.targe.iot.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Rest_Request")
public class RestRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Integer requestId;

    @Column(name = "endpoint", nullable = false)
    private String endpoint;

    @Column(name = "method", nullable = false)
    @Enumerated(EnumType.STRING)
    private Method method;

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
    @Enumerated(EnumType.STRING)
    private RestStatus restStatus;

    @ManyToMany
    @JoinTable(
            name = "Rest_Request_Sensor_Value_Plan",
            joinColumns = @JoinColumn(name = "request_id"),
            inverseJoinColumns = @JoinColumn(name = "plan_id")
    )
    private List<SensorValuePlan> sensorValuePlans;

    // Enums for Method and RestStatus
    public enum Method {
        GET, POST, PUT, DELETE
    }

    public enum RestStatus {
        PENDING, EXECUTED, FAILED
    }

    // Getters and Setters

    public Integer getRequestId() {
        return requestId;
    }

    public void setRequestId(Integer requestId) {
        this.requestId = requestId;
    }

    public String getEndpoint() {
        return endpoint;
    }

    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }

    public Method getMethod() {
        return method;
    }

    public void setMethod(Method method) {
        this.method = method;
    }

    public String getHeaders() {
        return headers;
    }

    public void setHeaders(String headers) {
        this.headers = headers;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Integer getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(Integer responseCode) {
        this.responseCode = responseCode;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }

    public String getResponseBody() {
        return responseBody;
    }

    public void setResponseBody(String responseBody) {
        this.responseBody = responseBody;
    }

    public Integer getTimeout() {
        return timeout;
    }

    public void setTimeout(Integer timeout) {
        this.timeout = timeout;
    }

    public RestStatus getRestStatus() {
        return restStatus;
    }

    public void setRestStatus(RestStatus restStatus) {
        this.restStatus = restStatus;
    }
}
