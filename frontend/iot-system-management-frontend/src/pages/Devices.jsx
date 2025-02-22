import { useState, useEffect } from "react";
import deviceService from "../services/deviceService";
import DeviceLogs from "./DeviceLogs";
import Batch from "./Batch";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNewDeviceModal, setShowNewDeviceModal] = useState(false);
  const [selecteddeviceId, setSelecteddeviceId] = useState(null);
  const [selectedCommanddeviceId, setSelectedCommanddeviceId] = useState(null);

  const [formData, setFormData] = useState({
    deviceName: "",
    deviceType: "",
    deviceId: "",
    systemId: 1,
  });

  const [formErrors, setFormErrors] = useState({});

  const [editingdeviceId, setEditingdeviceId] = useState(null);
  const [editName, setEditName] = useState("");

  const [user, setUser] = useState(null);

  const { darkMode } = useTheme();

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

  useEffect(() => {
    // Component mount olduğunda localStorage'dan user bilgisini al
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.deviceId.trim())
      errors.deviceId = "Cihaz ID boş bırakılamaz!";
    if (!formData.deviceName.trim())
      errors.deviceName = "Cihaz adı boş bırakılamaz!";
    if (!formData.deviceType.trim())
      errors.deviceType = "Cihaz tipi seçilmelidir!";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const newDevice = await deviceService.createDevice({
        deviceId: formData.deviceId,
        deviceName: formData.deviceName,
        deviceType: formData.deviceType,
      });

      setShowNewDeviceModal(false);
      setFormData({ deviceId: "", deviceName: "", deviceType: "" });
      fetchDevices();
    } catch (error) {
      console.error("Gönderilen veri:", formData);
      console.error("Hata detayı:", error.response?.data);

      // Eğer hata 409 (Conflict) ise, bu ID'ye sahip cihaz zaten var demektir
      if (error.response?.status === 409) {
        setFormErrors((prev) => ({
          ...prev,
          deviceId: "Bu ID'ye sahip bir cihaz zaten mevcut!",
        }));
      } else {
        // Diğer hatalar için genel bir hata mesajı göster
        alert(
          "Cihaz eklenirken bir hata oluştu: Zaten olan bir id ile cihaz eklenemez"
        );
      }
    }
  };

  const handleDownloadJSON = async () => {
    try {
      await deviceService.exportDevicesToJSON();
    } catch (error) {
      console.error("JSON indirme hatası:", error);
      setError(
        error.response?.data?.error ||
          error.message ||
          "JSON dosyası indirilirken bir hata oluştu"
      );
    }
  };

  const handleFileImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      await deviceService.importDevicesFromJSON(file);
      alert("Cihazlar başarıyla içe aktarıldı");
      fetchDevices(); // Cihaz listesini yenile
    } catch (error) {
      console.error("Import hatası:", error);
      setError("Cihazları içe aktarırken bir hata oluştu");
    }
    // Dosya input'unu temizle
    event.target.value = "";
  };

  const toggleDeviceLogs = (deviceId) => {
    console.log("Toggling logs for device:", deviceId); // Debug için
    setSelecteddeviceId(selecteddeviceId === deviceId ? null : deviceId);
  };

  const toggleCommands = (deviceId) => {
    setSelectedCommanddeviceId(
      selectedCommanddeviceId === deviceId ? null : deviceId
    );
  };

  const handleEdit = (device) => {
    if (editingdeviceId === device.deviceId) {
      // Zaten düzenleme modundaysa, kaydet
      handleSave(device);
    } else {
      // Düzenleme moduna geç
      setEditingdeviceId(device.deviceId);
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

      setEditingdeviceId(null);
      setEditName("");
      fetchDevices();
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      alert("Güncelleme sırasında bir hata oluştu!");
    }
  };

  const handleCancel = () => {
    setEditingdeviceId(null);
    setEditName("");
  };

  return (
    <div
      className={`container mx-auto px-4 py-8 ${
        darkMode ? "bg-transparent text-white" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cihazlar</h1>

        <div className="flex gap-4">
          {user?.userAuthorization === "admin" && (
            <button
              onClick={() => setShowNewDeviceModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              + Yeni Cihaz Ekle
            </button>
          )}
          <button
            onClick={handleDownloadJSON}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            Cihazları İndir
          </button>
          {user?.userAuthorization === "admin" && (
            <label className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors cursor-pointer">
              Cihazları İçe Aktar
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>
          )}
        </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-8">
          {devices && devices.length > 0 ? (
            devices.map((device) => (
              <div key={device.deviceId} className="mb-6">
                <div
                  className={`${
                    darkMode ? "bg-gray-800/80" : "bg-white"
                  } rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">
                      {editingdeviceId === device.deviceId ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="form-control"
                          style={{
                            backgroundColor: "#e8f5e9",
                            border: "1px solid #c8e6c9",
                            padding: "5px",
                            borderRadius: "4px",
                            width: "100%",
                            color: "#000000",
                          }}
                          autoFocus
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
                      <span className="text-gray-600 w-32">
                        Oluşturma Tarihi:
                      </span>
                      <span>
                        {new Date(device.createAt).toLocaleDateString("tr-TR")}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">
                    <button
                      onClick={() => toggleDeviceLogs(device.deviceId)}
                      className="flex-1 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                    >
                      {selecteddeviceId === device.deviceId
                        ? "Logları Gizle"
                        : "Logları Göster"}
                    </button>
                    <button
                      onClick={() => toggleCommands(device.deviceId)}
                      className="flex-1 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                    >
                      {selectedCommanddeviceId === device.deviceId
                        ? "Komutları Gizle"
                        : "Komutları Göster"}
                    </button>
                  </div>
                  <div className="flex gap-3 mt-3">
                    {user?.userAuthorization === "admin" && (
                      <button
                        onClick={() => handleEdit(device)}
                        className="flex-1 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                      >
                        Düzenle
                      </button>
                    )}
                    {user?.userAuthorization === "admin" && (
                      <button
                        onClick={() => handleDeleteDevice(device.deviceId)}
                        className="flex-1 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                      >
                        Sil
                      </button>
                    )}
                  </div>
                </div>

                {selecteddeviceId === device.deviceId && (
                  <div className="mt-4">
                    <DeviceLogs deviceId={device.deviceId} />
                  </div>
                )}
                {selectedCommanddeviceId === device.deviceId && (
                  <div className="mt-4 col-span-full">
                    <div
                      className={`${
                        darkMode ? "bg-gray-800/80" : "bg-gray-100"
                      } p-6 rounded-lg shadow-lg mx-auto w-full max-w-[1200px]`}
                    >
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
                  Cihaz ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="deviceId"
                  value={formData.deviceId}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md p-2 ${
                    formErrors.deviceId ? "border-red-500" : ""
                  }`}
                  placeholder="Cihaz ID'sini giriniz"
                />
                {formErrors.deviceId && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.deviceId}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Cihaz Adı <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="deviceName"
                  value={formData.deviceName}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md p-2 ${
                    formErrors.deviceName ? "border-red-500" : ""
                  }`}
                  placeholder="Cihaz adını giriniz"
                />
                {formErrors.deviceName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.deviceName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Cihaz Tipi <span className="text-red-500">*</span>
                </label>
                <select
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md p-2 ${
                    formErrors.deviceType ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Seçiniz</option>
                  <option value="Sensör">Sensör</option>
                  <option value="Cihaz">Cihaz</option>
                </select>
                {formErrors.deviceType && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.deviceType}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewDeviceModal(false);
                    setFormData({
                      deviceId: "",
                      deviceName: "",
                      deviceType: "",
                    });
                    setFormErrors({});
                  }}
                  className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
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
