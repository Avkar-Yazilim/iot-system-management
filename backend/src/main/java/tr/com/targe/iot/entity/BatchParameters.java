import jakarta.persistence.*;

@Entity
@Table(name = "Batch_Parameters")
public class BatchParameters {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "parameter_id", nullable = false)
    private Integer parameterId;

    @Column(name = "key", length = 255, nullable = false)
    private String key;

    @Column(name = "value", length = 255, nullable = false)
    private String value;

    @ManyToOne
    @JoinColumn(name = "command_id", referencedColumnName = "command_id", nullable = false)
    private BatchCommands batchCommand;

    // Getters and Setters
    public Integer getParameterId() {
        return parameterId;
    }

    public void setParameterId(Integer parameterId) {
        this.parameterId = parameterId;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public BatchCommands getBatchCommand() {
        return batchCommand;
    }

    public void setBatchCommand(BatchCommands batchCommand) {
        this.batchCommand = batchCommand;
    }
}
