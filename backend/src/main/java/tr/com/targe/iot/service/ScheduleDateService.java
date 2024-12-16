package tr.com.targe.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        return scheduleDateRepository.findAll().stream()
            .map(scheduleDateMapper::toDTO)
            .collect(Collectors.toList());
    }
}
