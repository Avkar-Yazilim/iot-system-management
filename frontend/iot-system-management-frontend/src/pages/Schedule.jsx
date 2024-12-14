import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { PlusIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom';

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

const RepeatPanel = ({ onClose, onSave }) => {
  const [frequency, setFrequency] = useState(1)
  const [selectedDay, setSelectedDay] = useState(null)
  const [endDate, setEndDate] = useState("")

  const days = [
    { short: "P", long: "Pazartesi" },
    { short: "S", long: "Salı" },
    { short: "Ç", long: "Çarşamba" },
    { short: "P", long: "Perşembe" },
    { short: "C", long: "Cuma" },
    { short: "C", long: "Cumartesi" },
    { short: "P", long: "Pazar" }
  ]

  const handleSave = () => {
    if (!selectedDay) {
      alert("Lütfen bir gün seçin")
      return
    }
    if (!endDate) {
      alert("Lütfen bitiş tarihi seçin")
      return
    }
    onSave({ frequency, selectedDay, endDate })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Yineleme</h2>
        
        {/* Yineleme Sıklığı */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Yineleme Sıklığı:</label>
          <input 
            type="number" 
            min="1" 
            value={frequency}
            onChange={(e) => setFrequency(parseInt(e.target.value))}
            className="border rounded p-2 w-16 text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">hafta</span>
        </div>

        {/* Gün Seçimi */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Gün Seçimi:</label>
          <div className="flex gap-2">
            {days.map((day, index) => (
              <button 
                key={index}
                type="button"
                title={day.long}
                onClick={() => setSelectedDay(index)}
                className={`
                  border rounded-full w-8 h-8 text-center text-sm
                  transition-colors duration-200
                  ${selectedDay === index 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'hover:bg-blue-100 text-gray-700'
                  }
                `}
              >
                {day.short}
              </button>
            ))}
          </div>
        </div>

        {/* Bitiş Ayarları */}
        <div className="mt-4">
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              name="endType" 
              defaultChecked 
              className="text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Şu tarihte:</span>
          </label>
          <input 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded p-2 mt-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Butonlar */}
        <div className="flex justify-end gap-2 mt-6">
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:underline px-4 py-2 text-sm font-medium"
          >
            İptal
          </button>
          <button 
            type="button"
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm font-medium transition-colors duration-200"
          >
            Bitti
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Schedule() {
  const navigate = useNavigate();
  const [events, setEvents] = useState(mockEvents)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showRepeatPanel, setShowRepeatPanel] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    deviceId: '',
    start: '',
    end: '',
    notes: '',
    repeat: false,
    repeatConfig: null
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

    if (newEvent.repeat && newEvent.repeatConfig) {
      const { frequency, selectedDay, endDate } = newEvent.repeatConfig
      const startDateTime = new Date(newEvent.start)
      const endDateTime = new Date(newEvent.end)
      const duration = endDateTime.getTime() - startDateTime.getTime() // Etkinlik süresi (ms)
      const endDateLimit = new Date(endDate)
      endDateLimit.setHours(23, 59, 59, 999) // Bitiş gününün sonuna kadar
      // İlk tarihi, seçilen güne ayarla
      let currentDate = new Date(startDateTime)
      while (currentDate.getDay() !== selectedDay) {
        currentDate.setDate(currentDate.getDate() + 1)
      }

      // Seçilen günden başlayarak, bitiş tarihine kadar tekrarla
      while (currentDate <= endDateLimit) {
        const eventStart = new Date(currentDate)
        eventStart.setHours(
          startDateTime.getHours(),
          startDateTime.getMinutes(),
          startDateTime.getSeconds()
        )

        const eventEnd = new Date(eventStart.getTime() + duration)

        newEvents.push({
          ...baseEvent,
          id: events.length + 1 + newEvents.length,
          start: eventStart.toISOString(),
          end: eventEnd.toISOString(),
        })

        // Sonraki tekrar için tarihi güncelle (frequency * 7 gün)
        currentDate.setDate(currentDate.getDate() + (frequency * 7))
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
      repeatConfig: null
    })
    setShowAddModal(false)
    navigate('/schedule')
  }

  const handleRepeatSave = (config) => {
    setNewEvent(prev => ({
      ...prev,
      repeatConfig: config
    }))
    setShowRepeatPanel(false)
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
            onClick={() => { setShowAddModal(true); navigate('/schedule/newschedule'); }}
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
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="repeat"
                          checked={newEvent.repeat}
                          onChange={(e) => {
                            setNewEvent({ ...newEvent, repeat: e.target.checked })
                            if (e.target.checked) {
                              setShowRepeatPanel(true)
                            }
                          }}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="repeat" className="ml-2 text-sm text-gray-700">
                          Tekrarla
                        </label>
                      </div>
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
                    onClick={() => {setShowAddModal(false); navigate('/schedule');}}
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
            setShowRepeatPanel(false)
            setNewEvent(prev => ({ ...prev, repeat: false }))
          }}
          onSave={handleRepeatSave}
        />
      )}
    </div>
  )
} 