package tr.com.targe.iot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tr.com.targe.iot.entity.Device;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {

    List<Device> findByDeleteByIsNullAndDeleteAtIsNull();
}
