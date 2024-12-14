package tr.com.targe.iot.repository;

import tr.com.targe.iot.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {

    List<Device> findByDeleteAtIsNullAndDeletedAtIsNull();
}
