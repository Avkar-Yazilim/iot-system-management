package tr.com.targe.iot.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long userId;
    private String username;
    private String passwordHash;
    private String email;
    private String UserAuthorization;
    private String firstName;
    private String lastName;
    private LocalDateTime lastLogin;
    private String createBy;

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getUserAuthorization() {
        return UserAuthorization;
    }
    
    public void setUserAuthorization(String UserAuthorization) {
        this.UserAuthorization = UserAuthorization;
    }

    public boolean isAdmin() {
        return "admin".equalsIgnoreCase(this.UserAuthorization);
    }

    public LocalDateTime getLastLogin() {
        return lastLogin;
    }

    public String getCreateBy() {
        return createBy;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }
    
    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }
}
