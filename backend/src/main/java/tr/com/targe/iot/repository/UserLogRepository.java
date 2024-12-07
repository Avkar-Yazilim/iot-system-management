package tr.com.targe.iot.repository;
import tr.com.targe.iot.entity.UserLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLogRepository extends JpaRepository<UserLog, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
}
