package tr.com.targe.iot.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "Rest_Parameters")
public class RestParameter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restparameter_id")
    private Integer restParameterId;

    @ManyToOne
    @JoinColumn(name = "request_id", nullable = false)
    private RestRequest request;

    @Column(name = "parameter_key", nullable = false)
    private String parameterKey;

    @Column(name = "parameter_value", nullable = false)
    private String parameterValue;

    // Getters and Setters

    public Integer getRestParameterId() {
        return restParameterId;
    }

    public void setRestParameterId(Integer restParameterId) {
        this.restParameterId = restParameterId;
    }

    public RestRequest getRequest() {
        return request;
    }

    public void setRequest(RestRequest request) {
        this.request = request;
    }

    public String getParameterKey() {
        return parameterKey;
    }

    public void setParameterKey(String parameterKey) {
        this.parameterKey = parameterKey;
    }

    public String getParameterValue() {
        return parameterValue;
    }

    public void setParameterValue(String parameterValue) {
        this.parameterValue = parameterValue;
    }
}
