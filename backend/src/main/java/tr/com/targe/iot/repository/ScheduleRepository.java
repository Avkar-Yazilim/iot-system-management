package tr.com.targe.iot.repository;
import tr.com.targe.iot.entity.Schedule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    // Gerekirse özel sorgular buraya eklenebilir

    
}
