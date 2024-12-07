package tr.com.targe.iot.repository;

import tr.com.targe.iot.entity.BatchCommands;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BatchCommandsRepository extends JpaRepository<BatchCommands, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
}
