package tr.com.targe.iot.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import tr.com.targe.iot.entity.OTP;
import tr.com.targe.iot.repository.OTPRepository;

@Service
@Slf4j
public class OTPService {
    
    @Autowired
    private OTPRepository otpRepository;
    
    @Autowired
    private EmailService emailService;
    
    public String generateOTP() {
        return String.format("%06d", new Random().nextInt(999999));
    }
    
    public void createAndSendOTP(String email) {
        String otp = generateOTP();
        LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(3);
        
        otpRepository.deleteByEmail(email);
        
        OTP otpEntity = new OTP();
        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setExpiresAt(expiresAt);
        otpRepository.save(otpEntity);
        
        emailService.sendOTPEmail(email, otp);
        log.info("OTP created and sent for email: {}", email);
    }
    
    public boolean verifyOTP(String email, String inputOTP) {
        OTP otpRecord = otpRepository.findByEmail(email)
            .orElse(null);
            
        if (otpRecord == null) {
            log.warn("No OTP found for email: {}", email);
            return false;
        }
        
        if (otpRecord.getExpiresAt().isBefore(LocalDateTime.now())) {
            log.warn("OTP expired for email: {}", email);
            otpRepository.delete(otpRecord);
            return false;
        }
        
        if (otpRecord.getOtp().equals(inputOTP)) {
            log.info("OTP verified for email: {}", email);
            otpRepository.delete(otpRecord);
            return true;
        }
        
        log.warn("Invalid OTP for email: {}", email);
        return false;
    }
}