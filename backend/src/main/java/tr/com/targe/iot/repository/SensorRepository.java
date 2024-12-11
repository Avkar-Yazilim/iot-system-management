package tr.com.targe.iot.repository;

import tr.com.targe.iot.entity.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SensorRepository extends JpaRepository<Sensor, Long> {
    List<Sensor> findByDeviceDeviceId(Long deviceId);
}
