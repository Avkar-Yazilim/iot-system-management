package tr.com.targe.iot.repository;
import tr.com.targe.iot.entity.SensorValues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SensorValuesRepository extends JpaRepository<SensorValues, Long> {
    
    // Belirli bir cihazın tüm sensör verilerini getir
    @Query("SELECT sv FROM SensorValues sv WHERE sv.device.deviceId = :deviceId")
    List<SensorValues> findByDeviceId(@Param("deviceId") Long deviceId);

    // Her cihaz için en son sensör verilerini getir
    @Query("SELECT sv FROM SensorValues sv WHERE (sv.device.deviceId, sv.updateAt) IN " +
           "(SELECT s.device.deviceId, MAX(s.updateAt) FROM SensorValues s GROUP BY s.device.deviceId, s.sensorType)")
    List<SensorValues> findLatestValuesForAllDevices();

    // Belirli bir cihazın en son sensör verilerini getir
    @Query("SELECT sv FROM SensorValues sv WHERE sv.device.deviceId = :deviceId AND " +
           "(sv.device.deviceId, sv.sensorType, sv.updateAt) IN " +
           "(SELECT s.device.deviceId, s.sensorType, MAX(s.updateAt) " +
           "FROM SensorValues s WHERE s.device.deviceId = :deviceId " +
           "GROUP BY s.device.deviceId, s.sensorType)")
    List<SensorValues> findLatestValuesForDevice(@Param("deviceId") Long deviceId);

 

    // Son N kayıt için cihaz bazlı sensör verileri
    @Query("SELECT sv FROM SensorValues sv " +
           "WHERE sv.device.deviceId = :deviceId " +
           "ORDER BY sv.updateAt DESC")
    List<SensorValues> findLastNValuesByDevice(@Param("deviceId") Long deviceId, org.springframework.data.domain.Pageable pageable);
}
