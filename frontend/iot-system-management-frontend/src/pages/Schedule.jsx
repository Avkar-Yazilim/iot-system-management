import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { PlusIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { ScheduleDateService } from "../services/ScheduleDateService";
import deviceService from "../services/deviceService";
import batchCommandService from "../services/batchCommandService";
import { ScheduleService } from "../services/scheduleService";

export default function Schedule() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRepeatPanel, setShowRepeatPanel] = useState(false);
  const [newEvent, setNewEvent] = useState({
    deviceId: null,
    commandId: null,
    eventTitle: "",
    recurrence: "Daily",
    interval: 1,
    startTime: "",
    endTime: "",
    untilDate: "",
    createBy: "Admin",
    version: "v1.0",
  });
  const [devices, setDevices] = useState([]);
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    const fetchScheduleDates = async () => {
      try {
        const scheduleDates = await ScheduleDateService.getAllScheduleDates();
        const calendarEvents = scheduleDates.map((scheduleDate) => ({
          id: scheduleDate.scheduleDateId,
          title: scheduleDate.eventTitle,
          start: scheduleDate.startTime,
          end: new Date(
            new Date(scheduleDate.startTime).getTime() + 60 * 60 * 1000
          ),
          backgroundColor:
            scheduleDate.status === "Active" ? "#22c55e" : "#6b7280",
        }));
        setEvents(calendarEvents);
      } catch (error) {
        console.error("Error fetching schedule dates:", error);
      }
    };

    fetchScheduleDates();
  }, []);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const fetchedDevices = await deviceService.getAllDevices();
        setDevices(fetchedDevices);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevices();
  }, []);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const fetchedCommands = await batchCommandService.getAllCommands();
        setCommands(fetchedCommands);
      } catch (error) {
        console.error("Error fetching commands:", error);
      }
    };
    fetchCommands();
  }, []);

  const handleDeviceChange = async (deviceId) => {
    console.log("Fetching commands for device ID:", deviceId);

    try {
      // Seçilen device'ın komutlarını getir
      const fetchedCommands = await batchCommandService.getBatchCommands(
        deviceId
      );
      console.log("Fetched Commands:", fetchedCommands);

      if (fetchedCommands && fetchedCommands.length > 0) {
        setCommands(fetchedCommands);
      } else {
        setCommands([]); // Komut yoksa boş array set et
        console.log("No commands found for this device");
      }
    } catch (error) {
      console.error("Error fetching commands for device:", error);
      setCommands([]); // Hata durumunda da boş array set et
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    console.log("Form submission - Full newEvent state:", newEvent);

    try {
      const scheduleData = {
        deviceId: Number(newEvent.deviceId),
        commandId: Number(newEvent.commandId),
        eventTitle: newEvent.eventTitle,
        recurrence: newEvent.recurrence,
        interval: Number(newEvent.interval),
        startTime: new Date(newEvent.startTime).toISOString(),
        endTime: new Date(newEvent.endTime).toISOString(),
        untilDate: new Date(newEvent.untilDate).toISOString(),
        createBy: newEvent.createBy,
        version: newEvent.version,
      };

      if (!scheduleData.deviceId || !scheduleData.commandId) {
        throw new Error("Cihaz ve komut seçimi zorunludur!");
      }

      console.log("Sending schedule data:", scheduleData);

      const response = await ScheduleService.createSchedule(scheduleData);
      console.log("Backend response:", response);

      // Add the new event to the calendar
      const calendarEvent = {
        id: response.id,
        title: newEvent.eventTitle,
        start: newEvent.startTime,
        end: newEvent.endTime,
        backgroundColor: "#22c55e",
      };

      setEvents([...events, calendarEvent]);

      // Reset form
      setNewEvent({
        deviceId: 1,
        commandId: 1,
        eventTitle: "",
        recurrence: "Daily",
        interval: 1,
        startTime: "",
        endTime: "",
        untilDate: "",
        createBy: "Admin",
        version: "v1.0",
      });

      setShowAddModal(false);
      navigate("/schedule");
      window.location.reload();
    } catch (error) {
      console.error("Detailed error:", error);
      console.error("Error stack:", error.stack);
      alert(`Program oluşturulurken bir hata oluştu: ${error.message}`);
    }
  };

  const handleRepeatSave = (config) => {
    setNewEvent((prev) => ({
      ...prev,
      repeatConfig: config,
    }));
    setShowRepeatPanel(false);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Program</h1>
          <p className="mt-2 text-sm text-gray-700">
            Cihazlarınız için programlanmış görevler
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => {
              setShowAddModal(true);
              navigate("/schedule");
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Yeni Program Ekle
          </button>
        </div>
      </div>

      <div className="mt-8">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          locale="tr"
          buttonText={{
            today: "Bugün",
            month: "Ay",
            week: "Hafta",
            day: "Gün",
          }}
          allDayText="Tüm Gün"
          height="auto"
        />
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <form onSubmit={handleAddEvent}>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Yeni Program Ekle
                  </h3>
                  <div className="mt-6 space-y-6">
                    <div>
                      <label
                        htmlFor="device"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Cihaz
                      </label>
                      <select
                        id="deviceId"
                        value={newEvent.deviceId}
                        onChange={(e) => {
                          setNewEvent({
                            ...newEvent,
                            deviceId: e.target.value,
                            commandId: "",
                          });
                          handleDeviceChange(e.target.value);
                        }}
                        className="input mt-1"
                        required
                      >
                        <option value="">Cihaz Seçin</option>
                        {devices.map((device) => (
                          <option key={device.deviceId} value={device.deviceId}>
                            {device.deviceName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="command"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Komut
                      </label>
                      <select
                        id="commandId"
                        value={newEvent.commandId}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            commandId: e.target.value,
                          })
                        }
                        className="input mt-1"
                        required
                      >
                        <option value="">Komut Seçin</option>
                        {commands.map((command) => (
                          <option
                            key={command.commandId}
                            value={command.commandId}
                          >
                            {command.command}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="eventTitle"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Program Adı
                      </label>
                      <input
                        type="text"
                        id="eventTitle"
                        value={newEvent.eventTitle}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            eventTitle: e.target.value,
                          })
                        }
                        className="input mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="startTime"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Başlangıç Zamanı
                      </label>
                      <input
                        type="datetime-local"
                        id="startTime"
                        value={newEvent.startTime}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            startTime: e.target.value,
                          })
                        }
                        className="input mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="endTime"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Bitiş Zamanı
                      </label>
                      <input
                        type="datetime-local"
                        id="endTime"
                        value={newEvent.endTime}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, endTime: e.target.value })
                        }
                        className="input mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="untilDate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tekrar Bitiş Tarihi
                      </label>
                      <input
                        type="datetime-local"
                        id="untilDate"
                        value={newEvent.untilDate}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            untilDate: e.target.value,
                          })
                        }
                        className="input mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="recurrence"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tekrar Sıklığı
                      </label>
                      <select
                        id="recurrence"
                        value={newEvent.recurrence}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            recurrence: e.target.value,
                          })
                        }
                        className="input mt-1"
                        required
                      >
                        <option value="Daily">Günlük</option>
                        <option value="Weekly">Haftalık</option>
                        <option value="Monthly">Aylık</option>
                        <option value="Yearly">Yıllık</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="interval"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tekrar Aralığı
                      </label>
                      <input
                        type="number"
                        id="interval"
                        min="1"
                        value={newEvent.interval}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            interval: parseInt(e.target.value),
                          })
                        }
                        className="input mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    onClick={handleAddEvent}
                    className="btn btn-primary w-full sm:w-auto sm:ml-3"
                  >
                    Ekle
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      navigate("/schedule");
                    }}
                    className="mt-3 sm:mt-0 w-full sm:w-auto btn border border-gray-300"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Yineleme Paneli */}
      {showRepeatPanel && (
        <RepeatPanel
          onClose={() => {
            setShowRepeatPanel(false);
            setNewEvent((prev) => ({ ...prev, repeat: false }));
          }}
          onSave={handleRepeatSave}
        />
      )}
    </div>
  );
}
