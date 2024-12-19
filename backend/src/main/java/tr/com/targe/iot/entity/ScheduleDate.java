package tr.com.targe.iot.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Data
@Table(name = "Schedule_Date")
public class ScheduleDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_date_id")
    private Long scheduleDateId;

    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private Schedule schedule;

    @Column(name = "schedule_id",insertable = false,updatable = false)
    private Long scheduleId;

    @Column(name = "start_time")
    private LocalDateTime startTime; 

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "create_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "create_by", length = 25,nullable = false)
    private String createdBy;

    @Column(name = "update_at")
    private LocalDateTime updatedAt;

    @Column(name = "update_by", length = 25)
    private String updatedBy;

    @Column(name = "delete_at")
    private LocalDateTime deletedAt;

    @Column(name = "delete_by", length = 25)
    private String deletedBy;
}
