package tr.com.targe.iot.repository;

import tr.com.targe.iot.entity.BatchCommands;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface BatchCommandsRepository extends JpaRepository<BatchCommands, Long> {
    @Query("SELECT d FROM BatchCommands d WHERE d.deviceId = :deviceId ORDER BY d.priority DESC")
    List<BatchCommands> findByDeviceId(@Param("deviceId") Long deviceId);

    @Query("SELECT d FROM BatchCommands d WHERE d.deviceId = :deviceId AND d.commandStatus = :status ORDER BY d.priority DESC")
    List<BatchCommands> findByDeviceIdAndStatusOrderByPriorityDesc(
        @Param("deviceId") Long deviceId, 
        @Param("status") String status
    );

    @Query("UPDATE BatchCommands SET commandStatus = :status WHERE commandId = :commandId")
    void updateCommandStatus(@Param("commandId") Long commandId, @Param("status") String status);

    @Procedure(name = "UpdateBatchCommandStatus")
    void updateBatchCommandStatus(@Param("newStatus") String newStatus, @Param("commandType") String commandType);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Batch_Commands bc " +
                   "SET command_status = 'Executed' " +
                   "WHERE bc.command_id IN (" +
                   "    SELECT s.command_id " +
                   "    FROM Schedule_Date sd " +
                   "    JOIN Schedules s ON sd.schedule_id = s.schedule_id " +
                   "    WHERE DATE_TRUNC('minute', sd.start_time) = DATE_TRUNC('minute', CURRENT_TIMESTAMP AT TIME ZONE 'UTC-3')" +
                   ")", nativeQuery = true)
    void executeScheduledCommands();
    
    @Transactional
    @Modifying
    @Query(value = "UPDATE Batch_Commands bc " +
                   "SET command_status = 'Pending' " +
                    "WHERE bc.command_id IN (" +
                    "    SELECT s.command_id " +
                    "    FROM Schedule_Date sd " +
                    "    JOIN Schedules s ON sd.schedule_id = s.schedule_id " +
                    "    WHERE DATE_TRUNC('minute', sd.end_time) = DATE_TRUNC('minute', CURRENT_TIMESTAMP AT TIME ZONE 'UTC-3')"+
                    ")", nativeQuery = true)
    void resetCommandStatusToPending();
    
}
