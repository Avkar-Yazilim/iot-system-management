import { useState, useEffect } from "react";
import deviceService from "../services/deviceService";
import DeviceLogs from "./DeviceLogs";
import Batch from "./Batch";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNewDeviceModal, setShowNewDeviceModal] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [selectedCommandDeviceId, setSelectedCommandDeviceId] = useState(null);

  const [formData, setFormData] = useState({
    deviceName: "",
    deviceType: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [editingDeviceId, setEditingDeviceId] = useState(null);
  const [editName, setEditName] = useState("");

  const fetchDevices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await deviceService.getAllDevices();
      console.log("Fetched devices:", response);
      if (Array.isArray(response)) {
        setDevices(response);
      } else {
        console.error("Invalid response format:", response);
        setError("Sunucudan geçersiz veri formatı alındı");
      }
    } catch (err) {
      console.error("Error details:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Cihazlar yüklenirken bir hata oluştu"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleUpdateDevice = async (id, deviceData) => {
    try {
      const updatedDevice = await deviceService.updateDevice(id, deviceData);
      setDevices(devices.map((d) => (d.deviceId === id ? updatedDevice : d)));
    } catch (err) {
      setError("Cihaz güncellenirken hata oluştu");
    }
  };

  const handleDeleteDevice = async (deviceId) => {
    try {
      const currentUser = localStorage.getItem("username");
      await deviceService.deleteDevice(deviceId, currentUser);
      fetchDevices();
      alert("Cihaz başarıyla silindi");
    } catch (error) {
      setError("Cihaz silinirken bir hata oluştu");
      console.error("Delete error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Input değiştiğinde o alan için olan hatayı temizle
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.deviceName.trim()) {
      errors.deviceName = "Cihaz adı boş bırakılamaz";
    }

    if (!formData.deviceType) {
      errors.deviceType = "Cihaz tipi seçilmelidir";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newDevice = await deviceService.createDevice({
        deviceName: formData.deviceName,
        deviceType: formData.deviceType,
      });

      setShowNewDeviceModal(false);
      setFormData({ deviceName: "", deviceType: "" });
      fetchDevices();
    } catch (error) {
      console.error("Gönderilen veri:", formData);
      console.error("Hata detayı:", error.response?.data);
    }
  };

  const toggleDeviceLogs = (deviceId) => {
    console.log("Toggling logs for device:", deviceId); // Debug için
    setSelectedDeviceId(selectedDeviceId === deviceId ? null : deviceId);
  };

  const toggleCommands = (deviceId) => {
    setSelectedCommandDeviceId(
      selectedCommandDeviceId === deviceId ? null : deviceId
    );
  };

  const handleEdit = (device) => {
    if (editingDeviceId === device.deviceId) {
      // Zaten düzenleme modundaysa, kaydet
      handleSave(device);
    } else {
      // Düzenleme moduna geç
      setEditingDeviceId(device.deviceId);
      setEditName(device.deviceName);
    }
  };

  const handleSave = async (device) => {
    try {
      if (!editName.trim()) {
        alert("Cihaz adı boş olamaz!");
        return;
      }

      await deviceService.updateDevice(device.deviceId, {
        ...device,
        deviceName: editName,
      });

      setEditingDeviceId(null);
      setEditName("");
      fetchDevices();
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      alert("Güncelleme sırasında bir hata oluştu!");
    }
  };

  const handleCancel = () => {
    setEditingDeviceId(null);
    setEditName("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cihazlar</h1>
        <button
          onClick={() => setShowNewDeviceModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          + Yeni Cihaz Ekle
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <strong className="font-bold">Hata!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {devices && devices.length > 0 ? (
            devices.map((device) => (
              <div key={device.deviceId} className="mb-6">
                <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">
                      {editingDeviceId === device.deviceId ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="form-control"
                          style={{
                            backgroundColor: "#e8f5e9", // Hafif açık yeşil
                            border: "1px solid #c8e6c9", // Hafif yeşil border
                            padding: "5px",
                            borderRadius: "4px",
                          }}
                          autoFocus // Otomatik fokus
                        />
                      ) : (
                        device.deviceName
                      )}
                    </h3>
                    <span
                      className={`h-3 w-3 rounded-full ${
                        device.deviceStatus === "active"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-gray-600 w-32">Tür:</span>
                      <span>{device.deviceType}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-32">Versiyon:</span>
                      <span>{device.version}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-32">Oluşturan:</span>
                      <span>{device.createBy}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-32">Oluşturma Tarihi:</span>
                      <span>{new Date(device.createAt).toLocaleDateString("tr-TR")}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">
                    <button
                      onClick={() => toggleDeviceLogs(device.deviceId)}
                      className="flex-1 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      {selectedDeviceId === device.deviceId
                        ? "Logları Gizle"
                        : "Logları Göster"}
                    </button>
                    <button
                      onClick={() => toggleCommands(device.deviceId)}
                      className="flex-1 px-4 py-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      {selectedCommandDeviceId === device.deviceId
                        ? "Komutları Gizle"
                        : "Komutları Göster"}
                    </button>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleEdit(device)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg transition-colors"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDeleteDevice(device.deviceId)}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2.5 px-4 rounded-lg transition-colors"
                    >
                      Sil
                    </button>
                  </div>
                </div>

                {selectedDeviceId === device.deviceId && (
                  <div className="mt-4">
                    <DeviceLogs deviceId={device.deviceId} />
                  </div>
                )}
                {selectedCommandDeviceId === device.deviceId && (
                  <div className="mt-4 -mx-6">
                    <div className="bg-gray-100 p-6">
                      <Batch deviceId={device.deviceId} />
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                Henüz hiç cihaz bulunmuyor.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Yeni Cihaz Ekleme Modal */}
      {showNewDeviceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Yeni Cihaz Ekle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Cihaz Adı <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="deviceName"
                  value={formData.deviceName}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                  placeholder="Cihaz adını giriniz"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Cihaz Tipi <span className="text-red-500">*</span>
                </label>
                <select
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Seçiniz</option>
                  <option value="sensor">Sensör</option>
                  <option value="detector">Dedektör</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewDeviceModal(false);
                    setFormData({
                      deviceName: "",
                      deviceType: "",
                    });
                    setFormErrors({});
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-300"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-300"
                >
                  Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
