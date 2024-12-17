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
import javax.servlet.ServletOutputStream;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import java.io.IOException;


@Service
@RequiredArgsConstructor
public class DeviceService {

    private final DeviceRepository deviceRepository;
    private final DeviceMapper deviceMapper;
    @Autowired
    private DeviceLogRepository deviceLogRepository;


    public List<DeviceDTO> getAllDevices() {
        List<Device> devices = deviceRepository.findAllActive();
        System.out.println("Found devices: " + devices); // Debug için
        return devices.stream()
                .map(deviceMapper::toDTO)
                .collect(Collectors.toList());
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

    public List<Device> findAll() {
        return deviceRepository.findAll(); 
    }

    public void generateExcelReport(HttpServletResponse response) { 
        try {
            // Excel raporu oluşturma kodu buraya gelecek
            
            List<Device> devices = deviceRepository.findAll();

            HSSFWorkbook workbook = new HSSFWorkbook();
            HSSFSheet sheet = workbook.createSheet("Devices");
            HSSFRow row = sheet.createRow(0);

            row.createCell(0).setCellValue("Device System Id");
            row.createCell(1).setCellValue("Device ID");
            row.createCell(2).setCellValue("Device Name");
            row.createCell(3).setCellValue("Device Type");
            row.createCell(4).setCellValue("Device Status");
            row.createCell(5).setCellValue("Device Create At");
            row.createCell(6).setCellValue("Device Update At");
            row.createCell(7).setCellValue("Device Delete At");
            row.createCell(8).setCellValue("Device Delete By");
            row.createCell(9).setCellValue("Device Create By");
            row.createCell(10).setCellValue("Device Version");

            int dataRowIndex = 1;
            for (Device device : devices) {
                row = sheet.createRow(dataRowIndex++);
                row.createCell(0).setCellValue(device.getSystemId());
                row.createCell(1).setCellValue(device.getDeviceId());
                row.createCell(2).setCellValue(device.getDeviceName());
                row.createCell(3).setCellValue(device.getDeviceType());
                row.createCell(4).setCellValue(device.getDeviceStatus());
                row.createCell(5).setCellValue(device.getCreateAt().toString());
                row.createCell(6).setCellValue(device.getUpdateAt().toString());
                row.createCell(7).setCellValue(device.getDeleteAt().toString());
                row.createCell(8).setCellValue(device.getDeleteBy());
                row.createCell(9).setCellValue(device.getCreateBy());
                row.createCell(10).setCellValue(device.getVersion());
                dataRowIndex++;
            }

            ServletOutputStream outputStream = response.getOutputStream();
            workbook.write(outputStream);
            workbook.close();
            outputStream.flush();
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace(); // Hata mesajını konsola yazdırabilir veya uygun bir şekilde ele alabilirsiniz
        }
    }

}
