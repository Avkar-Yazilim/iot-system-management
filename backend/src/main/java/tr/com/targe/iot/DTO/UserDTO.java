package tr.com.targe.iot.DTO;

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


    public String getUserAuthorization() {
        return UserAuthorization;
    }
    
    public void setUserAuthorization(String UserAuthorization) {
        this.UserAuthorization = UserAuthorization;
    }
}
