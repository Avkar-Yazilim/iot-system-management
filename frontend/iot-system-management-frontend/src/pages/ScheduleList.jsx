import { useState, useEffect } from "react";
import { ScheduleService } from "../services/scheduleService";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
import { Switch } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function ScheduleList() {
  const [schedules, setSchedules] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await ScheduleService.getAllSchedules();
        setSchedules(response);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, []);

  const handleDelete = async (id) => {
    try {
      await ScheduleService.deleteSchedule(id, "Admin");
      window.location.reload();
      setSchedules(schedules.filter((schedule) => schedule.scheduleId !== id));
    } catch (error) {
      console.error("Error deleting schedule:", error);
      alert("Program silinirken bir hata oluştu!");
    }
  };

  const handleEdit = async (schedule) => {
    try {
      // Tam schedule bilgilerini getir
      const fullSchedule = await ScheduleService.getScheduleById(
        schedule.scheduleId
      );

      // Tarihleri UTC+3 için ayarla ve input için uygun formata çevir
      const adjustDate = (date) => {
        const d = new Date(date);
        d.setHours(d.getHours() + 3); // UTC+3 için 3 saat ekle
        return d.toISOString().slice(0, 16);
      };

      setSelectedSchedule({
        ...fullSchedule,
        startTime: adjustDate(fullSchedule.startTime),
        endTime: adjustDate(fullSchedule.endTime),
        untilDate: adjustDate(fullSchedule.untilDate),
      });
      setShowEditModal(true);
    } catch (error) {
      console.error("Error fetching schedule details:", error);
      alert("Program bilgileri alınırken bir hata oluştu!");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Önce mevcut schedule'ı sil
      await ScheduleService.deleteSchedule(
        selectedSchedule.scheduleId,
        "Admin"
      );

      // Tarihleri düzelt
      const adjustedStartTime = new Date(
        new Date(selectedSchedule.startTime).getTime() -
          new Date().getTimezoneOffset() * 60000
      ).toISOString();

      const adjustedEndTime = new Date(
        new Date(selectedSchedule.endTime).getTime() -
          new Date().getTimezoneOffset() * 60000
      ).toISOString();

      const adjustedUntilDate = new Date(
        new Date(selectedSchedule.untilDate).getTime() -
          new Date().getTimezoneOffset() * 60000
      ).toISOString();

      // Yeni schedule için veriyi hazırla
      const scheduleData = {
        deviceId: selectedSchedule.deviceId,
        commandId: selectedSchedule.commandId,
        eventTitle: selectedSchedule.eventTitle,
        recurrence: selectedSchedule.recurrence,
        interval: selectedSchedule.interval,
        startTime: adjustedStartTime,
        endTime: adjustedEndTime,
        untilDate: adjustedUntilDate,
        createBy: selectedSchedule.createBy,
        version: selectedSchedule.version,
        createAt: selectedSchedule.createAt, // Orijinal oluşturma tarihini koru
      };

      console.log("Gönderilen veriler:", {
        orijinal: {
          startTime: adjustedStartTime,
          endTime: adjustedEndTime,
          untilDate: adjustedUntilDate,
        },
        düzeltilmiş: {
          startTime: adjustedStartTime,
          endTime: adjustedEndTime,
          untilDate: adjustedUntilDate,
        },
      });

      // Yeni schedule'ı oluştur
      await ScheduleService.createSchedule(scheduleData);

      setShowEditModal(false);
      setSelectedSchedule(null);
      window.location.reload();
    } catch (error) {
      console.error("Error updating schedule:", error);
      alert("Program güncellenirken bir hata oluştu!");
    }
  };

  const handleToggleStatus = async (schedule) => {
    try {
      if (schedule.status === "Active") {
        await ScheduleService.deactivateSchedule(schedule.scheduleId, "Admin");
      } else {
        await ScheduleService.activateSchedule(schedule.scheduleId, "Admin");
      }
      // Listeyi güncelle
      const response = await ScheduleService.getAllSchedules();
      setSchedules(response);
    } catch (error) {
      console.error("Error toggling schedule status:", error);
      alert("Program durumu değiştirilirken bir hata oluştu!");
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Programlar</h1>
          <p className="mt-2 text-sm text-gray-700">
            Sistemdeki tüm programların listesi
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Program Adı
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Başlangıç Zamanı
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Bitiş Zamanı
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Tekrar Sıklığı
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Tekrar Aralığı
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Durum
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Oluşturan
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">İşlemler</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {schedules.map((schedule) => (
                    <tr key={schedule.scheduleId}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {schedule.eventTitle}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(schedule.startTime).toLocaleString("tr-TR")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(schedule.endTime).toLocaleString("tr-TR")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {schedule.recurrence === "Daily"
                          ? "Günlük"
                          : schedule.recurrence === "Weekly"
                          ? "Haftalık"
                          : schedule.recurrence === "Monthly"
                          ? "Aylık"
                          : "Yıllık"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {schedule.interval}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <Switch
                          checked={schedule.status === "Active"}
                          onChange={() => handleToggleStatus(schedule)}
                          className={`${
                            schedule.status === "Active"
                              ? "bg-green-600"
                              : "bg-gray-200"
                          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                        >
                          <span
                            className={`${
                              schedule.status === "Active"
                                ? "translate-x-6"
                                : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                          />
                        </Switch>
                        <span className="ml-2">
                          {schedule.status === "Active" ? "Aktif" : "Pasif"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {schedule.createBy}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleEdit(schedule)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(schedule.scheduleId)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedSchedule && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <form onSubmit={handleUpdate}>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Programı Düzenle
                  </h3>
                  <div className="mt-6 space-y-6">
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
                        value={selectedSchedule.eventTitle}
                        onChange={(e) =>
                          setSelectedSchedule({
                            ...selectedSchedule,
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
                        value={selectedSchedule.startTime}
                        onChange={(e) =>
                          setSelectedSchedule({
                            ...selectedSchedule,
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
                        value={selectedSchedule.endTime}
                        onChange={(e) =>
                          setSelectedSchedule({
                            ...selectedSchedule,
                            endTime: e.target.value,
                          })
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
                        value={selectedSchedule.untilDate}
                        onChange={(e) =>
                          setSelectedSchedule({
                            ...selectedSchedule,
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
                        value={selectedSchedule.recurrence}
                        onChange={(e) =>
                          setSelectedSchedule({
                            ...selectedSchedule,
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
                        value={selectedSchedule.interval}
                        onChange={(e) =>
                          setSelectedSchedule({
                            ...selectedSchedule,
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
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Güncelle
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedSchedule(null);
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
