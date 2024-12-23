package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tr.com.targe.iot.DTO.ScheduleDateDTO;
import tr.com.targe.iot.repository.ScheduleDateRepository;
import tr.com.targe.iot.mapper.ScheduleDateMapper;

import java.util.List;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScheduleDateService {

    @Autowired
    private ScheduleDateRepository scheduleDateRepository;

    private final ScheduleDateMapper scheduleDateMapper;

    // Tüm ScheduleDate'leri getirir
    public List<ScheduleDateDTO> getAllScheduleDates() {
        return scheduleDateRepository.findAllActive().stream()
            .map(scheduleDateMapper::toDTO)
            .collect(Collectors.toList());
    }

    // Belirli bir tarihi sil
    @Transactional
    public void deleteScheduleDate(Long scheduleDateId) {
        scheduleDateRepository.deleteById(scheduleDateId);
    }
}
