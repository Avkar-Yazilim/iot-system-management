package tr.com.targe.iot.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import tr.com.targe.iot.service.BatchCommandsService;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CommandScheduler {

    private final BatchCommandsService batchCommandsService;

    @Scheduled(fixedRate = 60000) // Her 60 saniyede bir çalışır
    public void executeCommands() {
        batchCommandsService.executeScheduledCommands();
    }

    @Scheduled(fixedRate = 60000) // Her 60 saniyede bir çalışır
    public void resetCommandsToPending() {
        batchCommandsService.resetCommandStatusToPending();
    }
} 