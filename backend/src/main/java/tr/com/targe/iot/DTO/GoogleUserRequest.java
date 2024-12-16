package tr.com.targe.iot.DTO;

import lombok.Data;

@Data
public class GoogleUserRequest {
    private String email;
    private String displayName;
    private String uid;
}