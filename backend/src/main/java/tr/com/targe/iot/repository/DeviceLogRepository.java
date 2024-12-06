package tr.com.targe.iot.repository;

import tr.com.targe.iot.entity.DeviceLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceLogRepository extends JpaRepository<DeviceLog, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
}
