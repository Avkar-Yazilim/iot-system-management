package tr.com.targe.iot.repository;

import tr.com.targe.iot.entity.DeviceGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceGroupRepository extends JpaRepository<DeviceGroup, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
}
