package tr.com.targe.iot.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.targe.iot.repository.SensorValuesRepository;
import tr.com.targe.iot.entity.SensorValues;
import tr.com.targe.iot.mapper.SensorValuesMapper;
import java.util.List;
import java.util.stream.Collectors;
import tr.com.targe.iot.DTO.SensorValuesDTO;

@Service
@RequiredArgsConstructor
@Transactional
public class SensorValuesService {
    
    private final SensorValuesRepository sensorValuesRepository;
    private final SensorValuesMapper sensorValuesMapper;

    // Tüm sensör değerlerini getir
    public List<SensorValuesDTO> getAllSensorValues() {
        List<SensorValues> sensorValues = sensorValuesRepository.findAll();
        return sensorValues.stream()
            .map(sensorValuesMapper::toDTO)
            .collect(Collectors.toList());
    }

    // Belirli bir cihazın tüm sensör verilerini getir
    public List<SensorValuesDTO> getSensorValuesByDeviceId(Long deviceId) {
        List<SensorValues> sensorValues = sensorValuesRepository.findByDeviceId(deviceId);
        return sensorValues.stream()
            .map(sensorValuesMapper::toDTO)
            .collect(Collectors.toList());
    }

    // Her cihaz için en son sensör verilerini getir
    public List<SensorValuesDTO> getLatestValuesForAllDevices() {
        List<SensorValues> latestValues = sensorValuesRepository.findLatestValuesForAllDevices();
        return latestValues.stream()
            .map(sensorValuesMapper::toDTO)
            .collect(Collectors.toList());
    }

    // Belirli bir cihazın en son sensör verilerini getir
    public List<SensorValuesDTO> getLatestValuesForDevice(Long deviceId) {
        List<SensorValues> latestValues = sensorValuesRepository.findLatestValuesForDevice(deviceId);
        return latestValues.stream()
            .map(sensorValuesMapper::toDTO)
            .collect(Collectors.toList());
    }


    // Son N kayıt için cihaz bazlı sensör verilerini getir
    public List<SensorValuesDTO> getLastNValuesByDevice(Long deviceId, int count) {
        List<SensorValues> lastValues = sensorValuesRepository.findLastNValuesByDevice(
            deviceId, PageRequest.of(0, count));
        return lastValues.stream()
            .map(sensorValuesMapper::toDTO)
            .collect(Collectors.toList());
    }
}