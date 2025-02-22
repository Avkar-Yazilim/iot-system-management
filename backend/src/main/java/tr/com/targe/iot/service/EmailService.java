package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
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
    public void sendPasswordResetEmail(String email, String newPassword) {
       try {
           MimeMessage message = mailSender.createMimeMessage();
           MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
           helper.setSubject("Şifre Sıfırlama Talebi");
           helper.setText("Merhaba,\n\nYeni şifreniz: " + newPassword + "\n\nLütfen güvenliğiniz için giriş yaptıktan sonra şifrenizi değiştirin.\n\nİyi günler dileriz.", true);
            mailSender.send(message);
           System.out.println("Password reset email sent to: " + email);
       } catch (MessagingException e) {
           System.err.println("Error sending email: " + e.getMessage());
           e.printStackTrace();
       }
    }
}