package tr.com.targe.iot.repository;

import tr.com.targe.iot.entity.BatchParameters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BatchParametersRepository extends JpaRepository<BatchParameters, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
}
