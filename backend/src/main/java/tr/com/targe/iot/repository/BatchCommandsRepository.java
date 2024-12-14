package tr.com.targe.iot.repository;

import tr.com.targe.iot.entity.BatchCommands;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BatchCommandsRepository extends JpaRepository<BatchCommands, Long> {
    @Query("SELECT d FROM BatchCommands d WHERE d.deviceId = :deviceId ORDER BY d.priority DESC")
    List<BatchCommands> findByDeviceId(@Param("deviceId") Long deviceId);

    @Query("SELECT d FROM BatchCommands d WHERE d.deviceId = :deviceId AND d.commandStatus = :status ORDER BY d.priority DESC")
    List<BatchCommands> findByDeviceIdAndStatusOrderByPriorityDesc(
        @Param("deviceId") Long deviceId, 
        @Param("status") String status
    );
}
