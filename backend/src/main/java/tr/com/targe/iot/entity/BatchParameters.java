package tr.com.targe.iot.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

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
