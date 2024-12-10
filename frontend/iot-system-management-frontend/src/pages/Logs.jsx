import { useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'

const mockLogs = [
  {
    id: 1,
    device: 'Sulama Sistemi 1',
    action: 'Sulama Başlatıldı',
    status: 'success',
    timestamp: '2023-12-10 10:00:00',
  },
  {
    id: 2,
    device: 'Nem Sensörü 1',
    action: 'Nem Ölçümü',
    status: 'info',
    timestamp: '2023-12-10 09:45:00',
  },
  {
    id: 3,
    device: 'Sulama Sistemi 1',
    action: 'Sulama Durduruldu',
    status: 'warning',
    timestamp: '2023-12-10 08:30:00',
  },
]

const statusStyles = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
}

export default function Logs() {
  const [logs] = useState(mockLogs)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLogs = logs.filter(log => 
    log.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Geçmiş</h1>
          <p className="mt-2 text-sm text-gray-700">
            Cihazlarınızın aktivite geçmişi
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mt-6 max-w-md">
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
            placeholder="Cihaz veya işlem ara..."
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Cihaz
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      İşlem
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
                      Zaman
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {log.device}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {log.action}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusStyles[log.status]}`}>
                          {log.status === 'success' && 'Başarılı'}
                          {log.status === 'warning' && 'Uyarı'}
                          {log.status === 'error' && 'Hata'}
                          {log.status === 'info' && 'Bilgi'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {log.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 