package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    public void sendOTPEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("Tarla APP <your-email@gmail.com>");
        message.setTo(to);
        message.setSubject("Email Doğrulama Kodu");
        message.setText("Doğrulama kodunuz: " + otp + "\nBu kod 3 dakika geçerlidir.");
        
        mailSender.send(message);
        log.info("OTP email sent to: {}", to);
    }
}