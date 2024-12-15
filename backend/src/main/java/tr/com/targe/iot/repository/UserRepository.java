package tr.com.targe.iot.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tr.com.targe.iot.entity.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    @Query("SELECT d FROM User d WHERE d.deleteBy IS NULL AND d.deleteAt IS NULL")
    List<User> findAllActive();
}
