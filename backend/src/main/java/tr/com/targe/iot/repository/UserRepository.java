package tr.com.targe.iot.repository;
import tr.com.targe.iot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    @Query("SELECT d FROM User d WHERE d.deleteBy IS NULL AND d.deleteAt IS NULL")
    List<User> findAllActive();
}
