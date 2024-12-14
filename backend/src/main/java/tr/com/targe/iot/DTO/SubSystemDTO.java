package tr.com.targe.iot.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubSystemDTO {
    private Long id;
    private String name;
    private String version;

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}