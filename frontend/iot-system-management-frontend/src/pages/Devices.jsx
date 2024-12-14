import { useState, useEffect } from "react";
import deviceService from "../services/deviceService";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNewDeviceModal, setShowNewDeviceModal] = useState(false);

  const [formData, setFormData] = useState({
    deviceName: '',
    deviceType: '',
    serialNumber: '',
    group: ''
  });

  const [formErrors, setFormErrors] = useState({});

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

  const handleDeleteDevice = async (id) => {
    try {
      await deviceService.deleteDevice(id);
      setDevices(devices.filter((d) => d.deviceId !== id));
    } catch (err) {
      setError("Cihaz silinirken hata oluştu");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Input değiştiğinde o alan için olan hatayı temizle
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.deviceName.trim()) {
      errors.deviceName = 'Cihaz adı boş bırakılamaz';
    }
    
    if (!formData.deviceType) {
      errors.deviceType = 'Cihaz tipi seçilmelidir';
    }
    
    if (!formData.serialNumber.trim()) {
      errors.serialNumber = 'Seri numarası boş bırakılamaz';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Form gönderme işlemleri burada yapılacak
      console.log('Form data:', formData);
      setShowNewDeviceModal(false);
      // Form başarıyla gönderildikten sonra formu temizle
      setFormData({
        deviceName: '',
        deviceType: '',
        serialNumber: '',
        group: ''
      });
    } catch (err) {
      setError('Cihaz eklenirken bir hata oluştu');
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices && devices.length > 0 ? (
            devices.map((device) => (
              <div
                key={device.deviceId}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{device.deviceName}</h3>
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
                    <span className="text-gray-600 w-32">Sistem ID:</span>
                    <span>{device.systemId}</span>
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
                
                <div className="flex space-x-2 mt-4">
                  <button
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Logları Göster
                  </button>
                  <button
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDeleteDevice(device.deviceId)}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">Henüz hiç cihaz bulunmuyor.</p>
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
                  className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 
                    ${formErrors.deviceName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Cihaz adını giriniz"
                />
                {formErrors.deviceName && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.deviceName}</p>
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
                  className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500
                    ${formErrors.deviceType ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Seçiniz</option>
                  <option value="sensor">Sensör</option>
                  <option value="detector">Dedektör</option>
                </select>
                {formErrors.deviceType && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.deviceType}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Seri Numarası <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500
                    ${formErrors.serialNumber ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Seri numarasını giriniz"
                />
                {formErrors.serialNumber && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.serialNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Grup</label>
                <select 
                  name="group"
                  value={formData.group}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Grup Seçiniz</option>
                  <option value="group1">Grup 1</option>
                  <option value="group2">Grup 2</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewDeviceModal(false);
                    setFormData({
                      deviceName: '',
                      deviceType: '',
                      serialNumber: '',
                      group: ''
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
