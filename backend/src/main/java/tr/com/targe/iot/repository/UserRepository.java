package tr.com.targe.iot.repository;
import tr.com.targe.iot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Gerekirse özel sorgular buraya eklenebilir
}
