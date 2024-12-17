import { useState, useEffect } from "react";
import batchCommandService from "../services/batchCommandService";

export default function Batch({ deviceId }) {
  const [batchCommands, setBatchCommands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newCommand, setNewCommand] = useState({
    command: "",
    status: "Pending",
    priority: 1,
  });

  const priorityOptions = [
    { value: 1, label: "Düşük (1)" },
    { value: 2, label: "Orta-Düşük (2)" },
    { value: 3, label: "Orta (3)" },
    { value: 4, label: "Orta-Yüksek (4)" },
    { value: 5, label: "Yüksek (5)" },
  ];

  useEffect(() => {
    const getCommands = async () => {
      setLoading(true);
      try {
        const response = await batchCommandService.getBatchCommands(deviceId);
        setBatchCommands(response);
      } catch (error) {
        setError("Batch komutları yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    if (deviceId) {
      getCommands();
    }
  }, [deviceId]);

  const handleCreateBatchCommand = async (e) => {
    e.preventDefault();
    try {
      const commandData = {
        deviceId: deviceId,
        command: newCommand.command,
        status: newCommand.status,
        priority: newCommand.priority,
        timestamp: new Date().toISOString(),
      };
      const response = await batchCommandService.createBatchCommand(
        commandData
      );
      setBatchCommands([...batchCommands, response]);
      setNewCommand({ command: "", status: "Pending" });
    } catch (error) {
      setError("Batch komutu oluşturulurken bir hata oluştu");
    }
  };

  const handleExecuteCommand = async (commandId) => {
    try {
      const response = await batchCommandService.executeBatchCommand(commandId);
      const updatedCommands = batchCommands.map((command) =>
        command.commandId === commandId
          ? { ...command, status: "Executed" }
          : command
      );
      setBatchCommands(updatedCommands);
    } catch (error) {
      const updatedCommands = batchCommands.map((command) =>
        command.commandId === commandId
          ? { ...command, status: "Failed" }
          : command
      );
      setBatchCommands(updatedCommands);
    //setError("Komut çalıştırılırken bir hata oluştu");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Executed":
        return "text-green-600";
      case "Failed":
        return "text-red-600";
      case "Pending":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Cihaz Komutları</h3>

      {/* Komut Ekleme Formu */}
      <form onSubmit={handleCreateBatchCommand} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Komut"
            value={newCommand.command}
            onChange={(e) =>
              setNewCommand({ ...newCommand, command: e.target.value })
            }
            className="flex-1 p-2 border rounded"
            required
          />
          <select
            value={newCommand.priority}
            onChange={(e) =>
              setNewCommand({ ...newCommand, priority: Number(e.target.value) })
            }
            className="p-2 border rounded"
            required
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Ekle
          </button>
        </div>
      </form>

      {/* Komut Listesi */}
      {loading ? (
        <div>Yükleniyor...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="space-y-2">
          {batchCommands.map((command) => (
            <div
              key={command.commandId}
              className="flex justify-between items-center p-3 bg-white rounded shadow"
            >
              <div className="flex-1">
                <span className="font-medium">{command.command}</span>
                <div className="text-sm text-gray-500">
                  {new Date(command.timestamp).toLocaleString("tr-TR")}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  Öncelik: {command.priority}
                </span>
                <span className={`${getStatusColor(command.status)}`}>
                  {command.status}
                </span>
                {command.feedback && (
                  <span className="text-gray-600 text-sm">
                    Geri Bildirim: {command.feedback}
                  </span>
                )}
                <button
                  onClick={() => handleExecuteCommand(command.commandId)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Çalıştır
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
