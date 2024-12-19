package tr.com.targe.iot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class IOTSystemManagementApplication{

	public static void main(String[] args) {
		SpringApplication.run(IOTSystemManagementApplication.class, args);
	}

}
