import { useState } from 'react'
import { PlusIcon, InformationCircleIcon, TrashIcon } from '@heroicons/react/outline'

const mockDevices = [
  { id: 1, name: 'Sulama Sistemi 1', type: 'Sulama', serialNumber: 'WS001', isOnline: true },
  { id: 2, name: 'Nem Sensörü 1', type: 'Sensör', serialNumber: 'MS001', isOnline: false },
  { id: 3, name: 'Sıcaklık Sensörü 1', type: 'Sensör', serialNumber: 'TS001', isOnline: true },
]

const mockLogs = [
  { id: 1, deviceId: 1, action: "Sulama Başlatıldı", value: "5 dakika", timestamp: "2024-03-20 14:30", status: "success" },
  { id: 2, deviceId: 1, action: "Sulama Tamamlandı", value: "5 dakika", timestamp: "2024-03-20 14:35", status: "success" },
  { id: 3, deviceId: 2, action: "Nem Ölçümü", value: "%65", timestamp: "2024-03-20 14:40", status: "warning" },
  { id: 4, deviceId: 3, action: "Sıcaklık Ölçümü", value: "24°C", timestamp: "2024-03-20 14:45", status: "info" },
  { id: 5, deviceId: 2, action: "Bağlantı Hatası", value: "Timeout", timestamp: "2024-03-20 14:50", status: "error" },
]

export default function Devices() {
  const [devices, setDevices] = useState(mockDevices)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newDevice, setNewDevice] = useState({ name: '', type: '', serialNumber: '' })
  const [selectedDevice, setSelectedDevice] = useState(null)

  const handleAddDevice = (e) => {
    e.preventDefault()
    const device = {
      id: devices.length + 1,
      ...newDevice,
      isOnline: true,
    }
    setDevices([...devices, device])
    setNewDevice({ name: '', type: '', serialNumber: '' })
    setShowAddModal(false)
  }

  const handleDeleteDevice = (id) => {
    setDevices(devices.filter(device => device.id !== id))
  }

  const getStatusColor = (status) => {
    const colors = {
      success: 'text-green-600 bg-green-100',
      warning: 'text-yellow-600 bg-yellow-100',
      error: 'text-red-600 bg-red-100',
      info: 'text-blue-600 bg-blue-100'
    }
    return colors[status] || colors.info
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Cihazlar</h1>
          <p className="mt-2 text-sm text-gray-700">
            Tüm IoT cihazlarınızın listesi ve durumları
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary inline-flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Yeni Cihaz Ekle
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {devices.map((device) => (
          <div
            key={device.id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {device.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{device.type}</p>
                </div>
                <div className={`
                  flex-shrink-0 h-4 w-4 rounded-full
                  ${device.isOnline ? 'bg-green-400' : 'bg-gray-400'}
                `} />
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Seri No: {device.serialNumber}
                </p>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedDevice(device.id === selectedDevice ? null : device.id)}
                  className="btn flex-1 inline-flex justify-center items-center border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <InformationCircleIcon className="h-5 w-5 mr-2 text-gray-400" />
                  {device.id === selectedDevice ? 'Logları Gizle' : 'Logları Göster'}
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteDevice(device.id)}
                  className="btn flex-1 inline-flex justify-center items-center border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                >
                  <TrashIcon className="h-5 w-5 mr-2 text-red-400" />
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cihaz Logları Bölümü */}
      {selectedDevice && (
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {devices.find(d => d.id === selectedDevice)?.name} - Cihaz Logları
              </h3>
            </div>
            <div className="px-6 py-5">
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {mockLogs
                    .filter(log => log.deviceId === selectedDevice)
                    .map(log => (
                      <li key={log.id} className="py-5">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">
                              {log.action}
                            </p>
                            <div className="mt-1 flex items-center">
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                                {log.value}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <span className="text-sm text-gray-500">
                              {log.timestamp}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <form onSubmit={handleAddDevice}>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Yeni Cihaz Ekle
                  </h3>
                  <div className="mt-6 space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Cihaz Adı
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={newDevice.name}
                        onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                        className="input mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Cihaz Tipi
                      </label>
                      <select
                        id="type"
                        value={newDevice.type}
                        onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
                        className="input mt-1"
                        required
                      >
                        <option value="">Seçiniz</option>
                        <option value="Sulama">Sulama</option>
                        <option value="Sensör">Sensör</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
                        Seri Numarası
                      </label>
                      <input
                        type="text"
                        id="serialNumber"
                        value={newDevice.serialNumber}
                        onChange={(e) => setNewDevice({ ...newDevice, serialNumber: e.target.value })}
                        className="input mt-1"
                        required
                      />
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