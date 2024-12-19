package tr.com.targe.iot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tr.com.targe.iot.entity.OTP;

@Repository
public interface OTPRepository extends JpaRepository<OTP, Long> {
    java.util.Optional<OTP> findByEmail(String email);
    void deleteByEmail(String email);
}