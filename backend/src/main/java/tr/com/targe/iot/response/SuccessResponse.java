package tr.com.targe.iot.response;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class SuccessResponse {
    private String message;
    private LocalDateTime timestamp = LocalDateTime.now();

    public SuccessResponse(String message) {
        this.message = message;
    }
} 