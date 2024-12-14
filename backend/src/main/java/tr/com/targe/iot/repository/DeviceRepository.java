package tr.com.targe.iot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tr.com.targe.iot.entity.Device;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {

    @Query("SELECT d FROM Device d WHERE d.deleteBy IS NULL AND d.deleteAt IS NULL")
    List<Device> findAllActive();
}
