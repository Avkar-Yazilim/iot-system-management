package tr.com.targe.iot.repository;

import tr.com.targe.iot.entity.ScheduleDate;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleDateRepository extends JpaRepository<ScheduleDate, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
    @Query("SELECT s FROM ScheduleDate s WHERE s.status = :status")
    List<ScheduleDate> findScheduleDatesByStatus(@Param("status") ScheduleDate.Status status);
}
