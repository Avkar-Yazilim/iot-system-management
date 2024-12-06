package tr.com.targe.iot.repository;
import tr.com.targe.iot.entity.SubSystem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubSystemRepository extends JpaRepository<SubSystem, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
}
