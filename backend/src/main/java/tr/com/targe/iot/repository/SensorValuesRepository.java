package tr.com.targe.iot.repository;
import tr.com.targe.iot.entity.SensorValues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SensorValuesRepository extends JpaRepository<SensorValues, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
}
