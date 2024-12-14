import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import deviceService from "../services/deviceService";

export default function DeviceLogs() {
  const { deviceId } = useParams();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeviceLogs = async () => {
      setLoading(true);
      try {
        const response = await deviceService.getDeviceLogs(deviceId);
        setLogs(response);
      } catch (err) {
        setError("Loglar yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceLogs();
  }, [deviceId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Cihaz Logları</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {logs.map((log) => (
            <div key={log.id} className="border-b p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    log.type === "ERROR"
                      ? "bg-red-100 text-red-800"
                      : log.type === "WARNING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {log.type}
                </span>
              </div>
              <p className="mt-2">{log.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
