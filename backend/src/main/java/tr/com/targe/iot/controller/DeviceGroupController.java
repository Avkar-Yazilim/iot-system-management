package tr.com.targe.iot.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.targe.iot.entity.DeviceGroup;
import tr.com.targe.iot.service.DeviceGroupService;

import java.util.List;

@RestController
@RequestMapping("/api/device-groups")
public class DeviceGroupController {

    private final DeviceGroupService deviceGroupService;

    public DeviceGroupController(DeviceGroupService deviceGroupService) {
        this.deviceGroupService = deviceGroupService;
    }

    @GetMapping
    public ResponseEntity<List<DeviceGroup>> getAllDeviceGroups() {
        List<DeviceGroup> deviceGroups = deviceGroupService.getAllDeviceGroups();
        return ResponseEntity.ok(deviceGroups);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeviceGroup> getDeviceGroupById(@PathVariable Long id) {
        return deviceGroupService.getDeviceGroupById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DeviceGroup> createDeviceGroup(@RequestBody DeviceGroup deviceGroup) {
        DeviceGroup createdDeviceGroup = deviceGroupService.createDeviceGroup(deviceGroup);
        return ResponseEntity.ok(createdDeviceGroup);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeviceGroup> updateDeviceGroup(@PathVariable Long id, @RequestBody DeviceGroup deviceGroup) {
        DeviceGroup updatedDeviceGroup = deviceGroupService.updateDeviceGroup(id, deviceGroup);
        return ResponseEntity.ok(updatedDeviceGroup);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeviceGroup(@PathVariable Long id) {
        deviceGroupService.deleteDeviceGroup(id);
        return ResponseEntity.noContent().build();
    }
}
