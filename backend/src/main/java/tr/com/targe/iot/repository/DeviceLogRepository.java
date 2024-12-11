package tr.com.targe.iot.repository;

import tr.com.targe.iot.entity.Device;
import tr.com.targe.iot.entity.DeviceLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceLogRepository extends JpaRepository<DeviceLog, Long> {
    List<DeviceLog> findByDevice(Device device);
}
