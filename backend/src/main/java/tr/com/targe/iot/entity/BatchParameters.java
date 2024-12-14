package tr.com.targe.iot.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Batch_Parameters")
public class BatchParameters {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "parameter_id", nullable = false)
    private Long parameterId;

    @Column(name = "key", length = 255, nullable = false)
    private String key;

    @Column(name = "value", length = 255, nullable = false)
    private String value;

    @ManyToOne
    @JoinColumn(name = "command_id", referencedColumnName = "command_id", nullable = false)
    private BatchCommands batchCommand;


}
