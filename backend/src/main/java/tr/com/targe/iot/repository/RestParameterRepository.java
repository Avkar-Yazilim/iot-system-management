package tr.com.targe.iot.repository;
import tr.com.targe.iot.entity.RestParameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestParameterRepository extends JpaRepository<RestParameter, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
}
