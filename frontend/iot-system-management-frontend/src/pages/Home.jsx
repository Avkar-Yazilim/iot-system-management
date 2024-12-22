import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import sensorValuesService from "../services/sensorValuesService";
import deviceService from "../services/deviceService";
// Sensör tiplerine göre özel ikonlar ve renkler
const sensorConfig = {
  Rüzgar: {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2 2 0 1111.5 7.5h-.79l-.28-.27A2 2 0 013 6.46v.28"
        />
      </svg>
    ),
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  Sıcaklık: {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
  Nem: {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    color: "text-indigo-500",
    bgColor: "bg-indigo-100",
  },
  Barometre: {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  "Toprak Sensör": {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z M7 9h10M7 13h10"
        />
      </svg>
    ),
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  Pozometre: {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
};

// Varsayılan sensör konfigürasyonu
const defaultSensorConfig = {
  icon: (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  color: "text-gray-500",
  bgColor: "bg-gray-100",
};

const SensorCard = ({ title, value, unit, updateAt, darkMode }) => {
  // Sensör tipine göre konfigürasyon al veya varsayılanı kullan
  const config = sensorConfig[title] || defaultSensorConfig;

  // Tarih formatını düzenle
  const formattedDate = new Date(updateAt).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } overflow-hidden shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl`}
    >
      <div
        className={`${config.bgColor} ${
          darkMode ? "bg-opacity-10" : ""
        } px-4 py-2 flex items-center justify-between`}
      >
        <span className={`${config.color} font-medium`}>{title}</span>
        <span
          className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-xs`}
        >
          {formattedDate}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center">
          <div
            className={`${config.bgColor} ${
              darkMode ? "bg-opacity-10" : ""
            } p-3 rounded-lg`}
          >
            <span className={config.color}>{config.icon}</span>
          </div>
          <div className="ml-4">
            <div
              className={`${config.color} text-3xl font-bold tracking-tight`}
            >
              {value}
              <span className="text-sm ml-1 font-normal">{unit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add export function at the top level
const formatSensorDataForExport = async (devices, selectedDeviceId) => {
  const exportData = {};

  for (const device of devices) {
    if (selectedDeviceId && device.deviceId !== selectedDeviceId) continue;

    try {
      // Belirli bir cihazın tüm sensör değerlerini getir
      const deviceSensors = await sensorValuesService.getSensorValuesByDeviceId(
        device.deviceId
      );

      // Group by sensor type
      const sensorsByType = deviceSensors.reduce((types, sensor) => {
        if (!types[sensor.sensorType]) {
          types[sensor.sensorType] = [];
        }
        types[sensor.sensorType].push({
          value: sensor.dataValue,
          unit: sensor.unit,
          updateAt: sensor.updateAt,
        });
        return types;
      }, {});

      // Add device information along with sensor data
      exportData[device.deviceName] = {
        deviceId: device.deviceId,
        deviceType: device.deviceType,
        sensors: sensorsByType,
      };
    } catch (error) {
      console.error(
        `Error fetching sensor values for device ${device.deviceId}:`,
        error
      );
    }
  }

  return exportData;
};

export default function Home() {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [sensorValues, setSensorValues] = useState([]);
  const [sensorStats, setSensorStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const { darkMode } = useTheme();

  // Add export handler
  const handleExportData = async () => {
    try {
      const exportData = await formatSensorDataForExport(
        devices,
        selectedDeviceId
      );
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = window.URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      link.download = `sensor_data_${timestamp}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  // Cihazları yükle
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await deviceService.getAllDevices();
        setDevices(response);
        if (response.length > 0) {
          setSelectedDeviceId(response[0].deviceId);
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    fetchDevices();
  }, []);

  // Seçili cihazın sensör verilerini ve istatistikleri yükle
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedDeviceId) return;

      setLoading(true);
      try {
        // En son sensör verilerini getir
        const latestValues = await sensorValuesService.getLatestValuesForDevice(
          selectedDeviceId
        );
        setSensorValues(latestValues);

        // Sensör istatistiklerini getir
        const statistics =
          await sensorValuesService.getDeviceSensorStatisticsByDeviceId(
            selectedDeviceId
          );
        setSensorStats(statistics);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDeviceId]);

  const handleDeviceChange = (event) => {
    setSelectedDeviceId(Number(event.target.value));
  };

  // Sensör verilerini gruplandır
  const groupedSensors = sensorValues.reduce((groups, sensor) => {
    const category = sensor.sensorType;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(sensor);
    return groups;
  }, {});

  return (
    <div className={`p-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1
            className={`text-2xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Sensör Verileri
          </h1>
          <p
            className={`mt-2 text-sm ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Sisteminizdeki sensörlerin anlık verileri
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={handleExportData}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            JSON Olarak İndir
          </button>
        </div>
      </div>

      {/* Cihaz Seçimi */}
      <div
        className={`mb-6 p-4 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-lg`}
      >
        <div className="flex items-center space-x-4">
          <label
            htmlFor="deviceSelect"
            className={`font-medium ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Cihaz Seçin:
          </label>
          <select
            id="deviceSelect"
            value={selectedDeviceId || ""}
            onChange={handleDeviceChange}
            className={`form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900"
            }`}
          >
            <option value="">Cihaz Seçin</option>
            {devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.deviceName} ({device.deviceType})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSensors).map(([sensorType, sensors]) => {
            const stats = sensorStats.find(
              (stat) => stat.sensorType === sensorType
            );
            const latestSensor = sensors[0]; // En son sensör verisi
            const config = sensorConfig[sensorType] || defaultSensorConfig;

            return (
              <div
                key={sensorType}
                className={`p-6 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } rounded-lg shadow-lg`}
              >
                <h2
                  className={`text-xl font-semibold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {sensorType} Sensörleri
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <div
                    className={`${
                      darkMode ? "bg-gray-800" : "bg-white"
                    } overflow-hidden shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl`}
                  >
                    <div
                      className={`${config.bgColor} ${
                        darkMode ? "bg-opacity-10" : ""
                      } px-4 py-2 flex items-center justify-between`}
                    >
                      <span className={`${config.color} font-medium`}>
                        {sensorType}
                      </span>
                      <span
                        className={`${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        } text-xs`}
                      >
                        {new Date(latestSensor.updateAt).toLocaleString(
                          "tr-TR"
                        )}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center">
                        <div
                          className={`${config.bgColor} ${
                            darkMode ? "bg-opacity-10" : ""
                          } p-3 rounded-lg`}
                        >
                          <span className={config.color}>{config.icon}</span>
                        </div>
                        <div className="ml-4">
                          <div
                            className={`${config.color} text-3xl font-bold tracking-tight`}
                          >
                            {latestSensor.dataValue}
                            <span className="text-sm ml-1 font-normal">
                              {latestSensor.unit}
                            </span>
                          </div>
                        </div>
                      </div>
                      {stats && (
                        <div
                          className={`mt-3 pt-3 border-t ${
                            darkMode ? "border-gray-700" : "border-gray-200"
                          }`}
                        >
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span
                                className={
                                  darkMode ? "text-gray-400" : "text-gray-600"
                                }
                              >
                                Ortalama:
                              </span>
                              <span
                                className={`ml-1 font-medium ${
                                  darkMode ? "text-gray-200" : "text-gray-900"
                                }`}
                              >
                                {stats.average.toFixed(2)}
                              </span>
                            </div>
                            <div>
                              <span
                                className={
                                  darkMode ? "text-gray-400" : "text-gray-600"
                                }
                              >
                                Min:
                              </span>
                              <span
                                className={`ml-1 font-medium ${
                                  darkMode ? "text-gray-200" : "text-gray-900"
                                }`}
                              >
                                {stats.minimum.toFixed(2)}
                              </span>
                            </div>
                            <div>
                              <span
                                className={
                                  darkMode ? "text-gray-400" : "text-gray-600"
                                }
                              >
                                Maks:
                              </span>
                              <span
                                className={`ml-1 font-medium ${
                                  darkMode ? "text-gray-200" : "text-gray-900"
                                }`}
                              >
                                {stats.maximum.toFixed(2)}
                              </span>
                            </div>
                            <div>
                              <span
                                className={
                                  darkMode ? "text-gray-400" : "text-gray-600"
                                }
                              >
                                Kayıt:
                              </span>
                              <span
                                className={`ml-1 font-medium ${
                                  darkMode ? "text-gray-200" : "text-gray-900"
                                }`}
                              >
                                {stats.count}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Sistem Durumu */}
      <div className="mt-8">
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg rounded-lg p-6`}
        >
          <h2
            className={`text-lg font-medium ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Sistem Durumu
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatusItem
              title="Sulama Sistemi"
              status="Aktif"
              color="bg-green-400"
              darkMode={darkMode}
            />
            <StatusItem
              title="Sensör Ağı"
              status="Çalışıyor"
              color="bg-green-400"
              darkMode={darkMode}
            />
            <StatusItem
              title="İnternet Bağlantısı"
              status="Bağlı"
              color="bg-green-400"
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const StatusItem = ({ title, status, color, darkMode }) => (
  <div className="flex items-center">
    <div className="flex-shrink-0">
      <div className={`h-3 w-3 rounded-full ${color}`} />
    </div>
    <div className="ml-3">
      <div
        className={`text-sm font-medium ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </div>
      <div
        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
      >
        {status}
      </div>
    </div>
  </div>
);
