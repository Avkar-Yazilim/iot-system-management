package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.targe.iot.entity.Schedule;
import tr.com.targe.iot.entity.ScheduleDate;
import tr.com.targe.iot.entity.ScheduleDate.Status;
import tr.com.targe.iot.repository.ScheduleDateRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleDateService {

    @Autowired
    private ScheduleDateRepository scheduleDateRepository;

    // Schedule'ı kullanarak tüm ScheduleDate'leri oluşturur.
    @Transactional
    public void createScheduleDatesForSchedule(Schedule schedule) {
        LocalDateTime startTime = schedule.getStartTime();
        LocalDateTime untilDate = schedule.getUntilDate().atStartOfDay();
        
        // Recurrence türüne göre uygun tarihleri hesapla
        while (startTime.isBefore(untilDate) || startTime.isEqual(untilDate)) {
            ScheduleDate scheduleDate = new ScheduleDate();
            scheduleDate.setSchedule(schedule);
            scheduleDate.setStartTime(startTime);
            scheduleDate.setStatus(Status.ACTIVE);
            scheduleDate.setCreatedAt(LocalDateTime.now());
            scheduleDate.setCreatedBy("system"); // Bu değeri uygulamanın bağlamına göre değiştirebilirsiniz.
            
            // ScheduleDate'i veritabanına kaydet
            scheduleDateRepository.save(scheduleDate);
            
            // Sonraki tarih hesaplama
            switch (schedule.getRecurrence()) {
                case DAILY:
                    startTime = startTime.plusDays(schedule.getInterval());
                    break;
                case WEEKLY:
                    startTime = startTime.plusWeeks(schedule.getInterval());
                    break;
                case MONTHLY:
                    startTime = startTime.plusMonths(schedule.getInterval());
                    break;
                case YEARLY:
                    startTime = startTime.plusYears(schedule.getInterval());
                    break;
                default:
                    throw new IllegalArgumentException("Geçersiz tekrarlama türü: " + schedule.getRecurrence());
            }
        }
    }

    // ScheduleDate'leri status'e göre getirir
    public List<ScheduleDate> getScheduleDatesByStatus(Status status) {
        return scheduleDateRepository.findScheduleDatesByStatus(status);
    }

    // Tüm ScheduleDate'leri getirir
    public List<ScheduleDate> getAllScheduleDates() {
        return scheduleDateRepository.findAll();
    }

    // Belirli bir ID'ye göre ScheduleDate getirir
    public Optional<ScheduleDate> getScheduleDateById(Long id) {
        return scheduleDateRepository.findById(id);
    }

    // Yeni bir ScheduleDate kaydı oluşturur
    public ScheduleDate createScheduleDate(ScheduleDate scheduleDate) {
        scheduleDate.setCreatedAt(LocalDateTime.now());
        return scheduleDateRepository.save(scheduleDate);
    }

    // ScheduleDate günceller
    @Transactional
    public ScheduleDate updateScheduleDate(Long id, ScheduleDate updatedScheduleDate) {
        Optional<ScheduleDate> existingScheduleDateOpt = scheduleDateRepository.findById(id);
        if (existingScheduleDateOpt.isPresent()) {
            ScheduleDate existingScheduleDate = existingScheduleDateOpt.get();
            existingScheduleDate.setStartTime(updatedScheduleDate.getStartTime());
            existingScheduleDate.setStatus(updatedScheduleDate.getStatus());
            existingScheduleDate.setUpdatedAt(LocalDateTime.now());
            existingScheduleDate.setUpdatedBy(updatedScheduleDate.getUpdatedBy());
            return scheduleDateRepository.save(existingScheduleDate);
        } else {
            throw new RuntimeException("ScheduleDate kaydı bulunamadı. ID: " + id);
        }
    }

    // ScheduleDate siler
    public void deleteScheduleDate(Long id) {
        if (scheduleDateRepository.existsById(id)) {
            scheduleDateRepository.deleteById(id);
        } else {
            throw new RuntimeException("ScheduleDate kaydı bulunamadı. ID: " + id);
        }
    }
}
