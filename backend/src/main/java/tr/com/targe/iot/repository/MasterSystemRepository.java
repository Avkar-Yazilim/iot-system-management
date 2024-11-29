package tr.com.targe.iot.repository;

import tr.com.targe.iot.entity.MasterSystem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MasterSystemRepository extends JpaRepository<MasterSystem, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
}

