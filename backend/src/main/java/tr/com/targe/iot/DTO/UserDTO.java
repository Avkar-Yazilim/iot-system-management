package tr.com.targe.iot.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

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
    
    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }
}
