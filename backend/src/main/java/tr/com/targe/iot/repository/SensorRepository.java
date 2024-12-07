package tr.com.targe.iot.repository;

import tr.com.targe.iot.entity.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SensorRepository extends JpaRepository<Sensor, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
}
