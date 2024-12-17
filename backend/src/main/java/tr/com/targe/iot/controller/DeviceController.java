package tr.com.targe.iot.controller;

import java.util.List;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;

import lombok.RequiredArgsConstructor;
import tr.com.targe.iot.DTO.DeviceDTO;
import tr.com.targe.iot.service.DeviceService;

import com.opencsv.CSVWriter;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.opencsv.exceptions.CsvDataTypeMismatchException;
import com.opencsv.exceptions.CsvRequiredFieldEmptyException;


@RestController
@RequestMapping("/api/devices")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class DeviceController {
    
    private final DeviceService deviceService;

    @GetMapping
    public ResponseEntity<List<DeviceDTO>> getAllDevices() {
        return ResponseEntity.ok(deviceService.getAllDevices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeviceDTO> getDeviceById(@PathVariable Long id) {
        DeviceDTO device = deviceService.getDeviceById(id);
        return ResponseEntity.ok(device);
    }

    @PostMapping
    public ResponseEntity<?> createDevice(@RequestBody DeviceDTO deviceDTO) {
        try {
            System.out.println("Received DTO: " + deviceDTO);
            
            if (deviceDTO.getDeviceName() == null || deviceDTO.getDeviceType() == null) {
                return ResponseEntity.badRequest()
                    .body("Device name and type are required");
            }
            
            DeviceDTO createdDevice = deviceService.createDevice(deviceDTO);
            return ResponseEntity.ok(createdDevice);
            
        } catch (Exception e) {
            String errorMessage = "Error creating device: " + e.getMessage();
            System.err.println(errorMessage);
            System.err.println("Full error: " + e);
            
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(errorMessage);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDevice(@PathVariable Long id, @RequestBody DeviceDTO deviceDTO) {
        try {
            deviceDTO.setDeviceId(id);
            DeviceDTO updatedDevice = deviceService.updateDevice(id, deviceDTO);
            return ResponseEntity.ok(updatedDevice);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating device: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id, @RequestParam String username) {
        deviceService.deleteDevice(id, username);
        return ResponseEntity.ok().build();
    }


    @PatchMapping("/{id}/status")
    public ResponseEntity<DeviceDTO> updateDeviceStatus(
            @PathVariable Long id, 
            @RequestBody String status) {
            return ResponseEntity.ok(deviceService.updateDeviceStatus(id, status));
    }

    @GetMapping("/export/excel")
    public void exportDevicesToExcel(HttpServletResponse response) throws IOException {
            
        response.setContentType("application/vnd.ms-excel");
        response.setHeader("Content-Disposition", "attachment; filename=devices_v2.xls");
        deviceService.generateExcelReport(response);
    }

    @GetMapping("/export/csv")
    public ResponseEntity<Void> exportCSV(HttpServletResponse response) throws IOException {
        String fileName = "devices.csv";

        response.setContentType("text/csv");
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"");

        StatefulBeanToCsv<DeviceDTO> csvWriter = new StatefulBeanToCsvBuilder<DeviceDTO>(response.getWriter())
            .withSeparator(CSVWriter.DEFAULT_SEPARATOR)
            .withOrderedResults(false)
            .build();

        try {
            csvWriter.write(deviceService.getAllDevices());
        } catch (CsvRequiredFieldEmptyException | CsvDataTypeMismatchException e) {
            e.printStackTrace(); // Hata mesajını konsola yazdırabilir veya uygun bir şekilde ele alabilirsiniz
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return ResponseEntity.ok().build();
    }
}
