package tr.com.targe.iot.repository;

import tr.com.targe.iot.entity.ScheduleDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleDateRepository extends JpaRepository<ScheduleDate, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
    @Query("SELECT sd FROM ScheduleDate sd JOIN Schedule s ON sd.scheduleId = s.scheduleId WHERE s.status = 'Active'")
    List<ScheduleDate> findAllActive();

    @Query("SELECT sd FROM ScheduleDate sd WHERE sd.schedule.scheduleId = :scheduleId")
    List<ScheduleDate> findByScheduleId(Long scheduleId);


}
