import { useState, useEffect } from "react";
import deviceLogService from "../services/deviceLogService";

export default function DeviceLogs({ deviceId }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeviceLogs = async () => {
      if (!deviceId) return;

      setLoading(true);
      try {
        const response = await deviceLogService.getDeviceLogs(deviceId);
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
    <div className="bg-white rounded-lg shadow-lg p-4 m-4">
      <h2 className="text-xl font-semibold mb-4">Cihaz #{deviceId} Logları</h2>

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
        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.logId}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="mt-2 text-gray-800">{log.message}</p>
            </div>
          ))}
          {logs.length === 0 && (
            <p className="text-center text-gray-500">
              Bu cihaz için log kaydı bulunmamaktadır.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
