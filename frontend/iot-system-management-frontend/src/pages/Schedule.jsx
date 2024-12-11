import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { PlusIcon } from '@heroicons/react/outline'

const mockDevices = [
  { id: 1, name: 'Sulama Sistemi 1', type: 'Sulama' },
  { id: 2, name: 'Sulama Sistemi 2', type: 'Sulama' },
  { id: 3, name: 'Nem Sensörü 1', type: 'Sensör' },
]

const mockEvents = [
  {
    id: 1,
    title: 'Sulama 1',
    deviceId: 1,
    start: '2023-12-10T10:00:00',
    end: '2023-12-10T11:00:00',
    backgroundColor: '#22c55e',
  },
  {
    id: 2,
    title: 'Sulama 2',
    deviceId: 2,
    start: '2023-12-11T14:00:00',
    end: '2023-12-11T15:00:00',
    backgroundColor: '#22c55e',
  },
]

export default function Schedule() {
  const [events, setEvents] = useState(mockEvents)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    deviceId: '',
    start: '',
    end: '',
    notes: '',
    repeat: false,
    repeatCount: 1,
  })

  const handleAddEvent = (e) => {
    e.preventDefault()
    const selectedDevice = mockDevices.find(d => d.id === parseInt(newEvent.deviceId))
    
    let newEvents = []
    const baseEvent = {
      id: events.length + 1,
      ...newEvent,
      deviceId: parseInt(newEvent.deviceId),
      title: `${selectedDevice.name} - ${newEvent.title}`,
      backgroundColor: '#22c55e',
    }

    if (newEvent.repeat) {
      // Tekrarlanan etkinlikleri oluştur
      for (let i = 0; i < newEvent.repeatCount; i++) {
        const startDate = new Date(newEvent.start)
        const endDate = new Date(newEvent.end)
        
        // Her tekrar için tarihi bir gün ileri al
        startDate.setDate(startDate.getDate() + i)
        endDate.setDate(endDate.getDate() + i)

        newEvents.push({
          ...baseEvent,
          id: events.length + 1 + i,
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        })
      }
    } else {
      newEvents = [baseEvent]
    }

    setEvents([...events, ...newEvents])
    setNewEvent({
      title: '',
      deviceId: '',
      start: '',
      end: '',
      notes: '',
      repeat: false,
      repeatCount: 1,
    })
    setShowAddModal(false)
  }

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
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary inline-flex items-center"
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
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          locale="tr"
          buttonText={{
            today: 'Bugün',
            month: 'Ay',
            week: 'Hafta',
            day: 'Gün',
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
                      <label htmlFor="device" className="block text-sm font-medium text-gray-700">
                        Cihaz
                      </label>
                      <select
                        id="device"
                        value={newEvent.deviceId}
                        onChange={(e) => setNewEvent({ ...newEvent, deviceId: e.target.value })}
                        className="input mt-1"
                        required
                      >
                        <option value="">Cihaz Seçin</option>
                        {mockDevices.filter(d => d.type === 'Sulama').map(device => (
                          <option key={device.id} value={device.id}>
                            {device.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Program Adı
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="input mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="start" className="block text-sm font-medium text-gray-700">
                        Başlangıç Zamanı
                      </label>
                      <input
                        type="datetime-local"
                        id="start"
                        value={newEvent.start}
                        onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                        className="input mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="end" className="block text-sm font-medium text-gray-700">
                        Bitiş Zamanı
                      </label>
                      <input
                        type="datetime-local"
                        id="end"
                        value={newEvent.end}
                        onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                        className="input mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                        Notlar
                      </label>
                      <textarea
                        id="notes"
                        value={newEvent.notes}
                        onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                        className="input mt-1"
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="repeat"
                            checked={newEvent.repeat}
                            onChange={(e) => setNewEvent({ ...newEvent, repeat: e.target.checked })}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <label htmlFor="repeat" className="ml-2 text-sm text-gray-700">
                            Tekrarla
                          </label>
                        </div>
                        {newEvent.repeat && (
                          <div className="flex items-center">
                            <label htmlFor="repeatCount" className="text-sm text-gray-700 mr-2">
                              Tekrar Sayısı:
                            </label>
                            <input
                              type="number"
                              id="repeatCount"
                              min="1"
                              max="30"
                              value={newEvent.repeatCount}
                              onChange={(e) => setNewEvent({ ...newEvent, repeatCount: parseInt(e.target.value) })}
                              className="w-20 input"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto sm:ml-3"
                  >
                    Ekle
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
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
    </div>
  )
} 