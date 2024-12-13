import { useState, useEffect } from "react";
import deviceService from "../services/deviceService";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cihaz Yönetimi</h1>
        <button
          onClick={fetchDevices}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          )}
          Yenile
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
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {device.deviceName}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      device.deviceStatus === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {device.deviceStatus === "active" ? "Aktif" : "Çevrimdışı"}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">
                    <span className="font-medium">Tür:</span>{" "}
                    {device.deviceType}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Versiyon:</span>{" "}
                    {device.version}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Sistem ID:</span>{" "}
                    {device.systemId}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Oluşturan:</span>{" "}
                    {device.createBy}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Oluşturma Tarihi:</span>{" "}
                    {new Date(device.createAt).toLocaleDateString("tr-TR")}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdateDevice(device.deviceId, device)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Güncelle
                  </button>
                  <button
                    onClick={() => handleDeleteDevice(device.deviceId)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
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
    </div>
  );
}
