package tr.com.targe.iot.repository;
import tr.com.targe.iot.entity.SensorValuePlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SensorValuePlanRepository extends JpaRepository<SensorValuePlan, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
}
