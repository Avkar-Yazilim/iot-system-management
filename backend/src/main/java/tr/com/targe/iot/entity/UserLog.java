package tr.com.targe.iot.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Data
@Table(name = "User_Logs")
public class UserLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Long logId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "action", nullable = false)
    private String action;

    @Column(name = "timestamp")
    private LocalDateTime timestamp;

    @Transient
    private String username;

    // Getters and Setters

    public Long getUserId() {
        return user != null ? user.getUserId() : null; // deviceId'ye erişim
    }

    public void setUserId(Long userId) {
        if (this.user == null) {
            this.user = new User();
        }
        this.user.setUserId(userId);
    }
}
