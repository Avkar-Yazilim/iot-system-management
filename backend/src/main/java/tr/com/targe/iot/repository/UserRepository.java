package tr.com.targe.iot.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import tr.com.targe.iot.entity.User;


@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Long> {
    
    @Query(value = "CALL decrypt_existing_password(:userId, :key, null)", nativeQuery = true)
    String decryptPassword(@Param("userId") Long userId, @Param("key") String key);
    
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);
    
    @Query("SELECT d FROM User d WHERE d.deleteBy IS NULL AND d.deleteAt IS NULL")
    List<User> findAllActive();

    @Modifying(clearAutomatically = true)
    @Query(value = "CALL encrypt_existing_password(:userId, :key)", nativeQuery = true)
    void saveEncryptedPassword(@Param("userId") Long userId, @Param("key") String key);
}
