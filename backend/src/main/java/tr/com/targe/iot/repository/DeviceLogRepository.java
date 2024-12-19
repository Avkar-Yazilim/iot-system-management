package tr.com.targe.iot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tr.com.targe.iot.entity.Device;
import tr.com.targe.iot.entity.DeviceLog;

@Repository
public interface DeviceLogRepository extends JpaRepository<DeviceLog, Long> {
    List<DeviceLog> findByDevice(Device device);

    @Query("SELECT d FROM DeviceLog d WHERE d.deviceId = :deviceId")
    List<DeviceLog> findByDeviceId(@Param("deviceId") Long deviceId);

    @Query("SELECT d FROM DeviceLog d")
    List<DeviceLog> findLogs();

    @Modifying
    @Query(value = "CALL log_device_creation(?1)", nativeQuery = true)
    void logDeviceCreation(Long deviceId);
}