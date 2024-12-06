package tr.com.targe.iot.repository;

import tr.com.targe.iot.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
}
