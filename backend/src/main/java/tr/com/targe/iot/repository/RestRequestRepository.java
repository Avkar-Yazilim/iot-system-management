package tr.com.targe.iot.repository;

import tr.com.targe.iot.entity.RestRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestRequestRepository extends JpaRepository<RestRequest, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
}
