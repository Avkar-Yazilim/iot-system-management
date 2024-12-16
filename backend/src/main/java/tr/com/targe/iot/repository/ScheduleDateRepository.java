package tr.com.targe.iot.repository;

import tr.com.targe.iot.entity.ScheduleDate;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleDateRepository extends JpaRepository<ScheduleDate, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
}
