import { useState, useEffect } from "react";
import sensorValuesService from "../services/sensorValuesService";
import { useTheme } from "../context/ThemeContext";

const SensorCard = ({ title, value, unit, updateAt, stats, darkMode }) => {
  return (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } p-4 rounded-lg shadow-lg`}
    >
      <div className="flex justify-between items-center mb-2">
        <h4
          className={`text-lg font-medium ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          {title}
        </h4>
        <span
          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {new Date(updateAt).toLocaleString("tr-TR")}
        </span>
      </div>
      <div className="text-2xl font-semibold text-green-500">
        {value}
        <span
          className={`text-sm ml-1 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {unit}
        </span>
      </div>
      {stats && (
        <div
          className={`mt-3 pt-3 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
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
              <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
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
              <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
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
              <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
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
  );
};

export default function SensorValues({ deviceId }) {
  const [sensorValues, setSensorValues] = useState([]);
  const [sensorStats, setSensorStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      if (!deviceId) return;

      setLoading(true);
      setError(null);
      try {
        // Tüm sensör verilerini getir
        const allValues = await sensorValuesService.getAllSensorValues();
        const deviceValues = allValues.filter(
          (sensor) => sensor.deviceId === deviceId
        );
        setSensorValues(deviceValues);

        // Sensör istatistiklerini getir
        const statistics =
          await sensorValuesService.getDeviceSensorStatisticsByDeviceId(
            deviceId
          );
        setSensorStats(statistics);
      } catch (err) {
        console.error("Error fetching sensor data:", err);
        setError("Sensör verileri yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deviceId]);

  // Sensör verilerini gruplandır
  const groupedSensors = sensorValues.reduce((groups, sensor) => {
    const category = sensor.sensorType;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(sensor);
    return groups;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Hata!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (Object.keys(groupedSensors).length === 0) {
    return (
      <div
        className={`text-center py-4 ${
          darkMode ? "text-gray-300" : "text-gray-500"
        }`}
      >
        Bu cihaz için sensör verisi bulunmamaktadır.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedSensors).map(([sensorType, sensors]) => {
        const stats = sensorStats.find(
          (stat) => stat.sensorType === sensorType
        );
        const latestSensor = sensors[0]; // En son sensör verisi

        return (
          <div key={sensorType} className="space-y-4">
            <h3
              className={`text-lg font-medium ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {sensorType}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <SensorCard
                title={sensorType}
                value={latestSensor.dataValue}
                unit={latestSensor.unit}
                updateAt={latestSensor.updateAt}
                stats={stats}
                darkMode={darkMode}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
