package tr.com.targe.iot.repository;
import tr.com.targe.iot.entity.Schedule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    // Gerekirse özel sorgular buraya eklenebilir

    //Find schedule by status
    @Query("SELECT s FROM Schedule s WHERE s.status = :status")
    List<Schedule> findSchedulesByStatus(@Param("status") Schedule.Status status);
    
}
