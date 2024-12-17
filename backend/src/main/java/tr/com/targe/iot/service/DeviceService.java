package tr.com.targe.iot.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tr.com.targe.iot.DTO.DeviceDTO;
import tr.com.targe.iot.entity.Device;
import tr.com.targe.iot.entity.DeviceLog;
import tr.com.targe.iot.mapper.DeviceMapper;
import tr.com.targe.iot.repository.DeviceLogRepository;
import tr.com.targe.iot.repository.DeviceRepository;

import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;


@Service
@RequiredArgsConstructor
public class DeviceService {

    private final DeviceRepository deviceRepository;
    private final DeviceMapper deviceMapper;
    @Autowired
    private DeviceLogRepository deviceLogRepository;


    public List<DeviceDTO> getAllDevices() {
        try {
            List<Device> devices = deviceRepository.findAllActive();
            System.out.println("Found devices count: " + devices.size()); // Debug log
            
            List<DeviceDTO> deviceDTOs = devices.stream()
                    .map(device -> {
                        try {
                            DeviceDTO dto = deviceMapper.toDTO(device);
                            System.out.println("Mapped device: " + dto); // Debug log
                            return dto;
                        } catch (Exception e) {
                            System.err.println("Error mapping device: " + device.getDeviceId());
                            e.printStackTrace();
                            return null;
                        }
                    })
                    .filter(dto -> dto != null)
                    .collect(Collectors.toList());
                    
            System.out.println("Mapped DTOs count: " + deviceDTOs.size()); // Debug log
            return deviceDTOs;
        } catch (Exception e) {
            System.err.println("Error in getAllDevices: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error fetching devices: " + e.getMessage());
        }
    }

    public DeviceDTO getDeviceById(Long id) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found"));
        return deviceMapper.toDTO(device);
    }

    public DeviceDTO createDevice(DeviceDTO deviceDTO) {
        try {
            Device device = deviceMapper.toEntity(deviceDTO);
            device.setDeviceStatus("inactive");
            device.setCreateAt(LocalDateTime.now());
            device.setCreateBy("admin");
            device.setVersion("1.0");
            device.setSystemId(1L);
            
            Device savedDevice = deviceRepository.save(device);
            
            return deviceMapper.toDTO(savedDevice);
        } catch (Exception e) {
            throw new RuntimeException("Device creation failed: " + e.getMessage());
        }
    }

    public DeviceDTO updateDevice(Long id, DeviceDTO deviceDTO) {
        Device existingDevice = deviceRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Device not found"));
        
        updateDeviceFields(existingDevice, deviceDTO);
        
        existingDevice.setDeviceName(deviceDTO.getDeviceName());
        Device updatedDevice = deviceRepository.save(existingDevice);
        
        // Log kaydı
        DeviceLog log = new DeviceLog();
        log.setDevice(updatedDevice);
        log.setMessage("Cihazın adı '" + updatedDevice.getDeviceName() + "' olarak değiştirildi");
        log.setTimestamp(LocalDateTime.now());
        deviceLogRepository.save(log);
        
        return deviceMapper.toDTO(updatedDevice);
    }

    public void deleteDevice(Long id, String username) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cihaz bulunamadı"));
        device.setDeleteBy("admin");
        device.setDeleteAt(LocalDateTime.now());
        deviceRepository.save(device);
    }


    public DeviceDTO updateDeviceStatus(Long id, String status) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found"));
        device.setUpdateAt(LocalDateTime.now());
        Device updatedDevice = deviceRepository.save(device);
        return deviceMapper.toDTO(updatedDevice);
    }

    private void updateDeviceFields(Device existingDevice, DeviceDTO newDeviceDTO) {
        existingDevice.setDeviceName(newDeviceDTO.getDeviceName());
        existingDevice.setDeviceType(newDeviceDTO.getDeviceType());
        existingDevice.setDeviceStatus("inactive");
        existingDevice.setUpdateAt(LocalDateTime.now());
        existingDevice.setUpdateBy("admin");
        existingDevice.setVersion(newDeviceDTO.getVersion());
    }

    public Device findDeviceById(Long id) {
        return deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found"));
    } 

    public void generateJSONReport(HttpServletResponse response) {
        try {
            // Veritabanından cihazları al
            List<Device> devices = deviceRepository.findAll();
            System.out.println("Devices fetched for JSON: " + devices); // Debug için log
    
            // JSON oluşturmak için ObjectMapper kullan
            ObjectMapper objectMapper = new ObjectMapper();
    
            // JSON verisini response'un outputStream'ine yaz
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(response.getOutputStream(), devices);
    
            response.getOutputStream().flush();
        } catch (IOException e) {
            throw new RuntimeException("JSON raporu oluşturulurken hata oluştu: " + e.getMessage());
        }
    }
}
