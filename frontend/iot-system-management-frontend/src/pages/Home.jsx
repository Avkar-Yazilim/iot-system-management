import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const mockSensorData = {
  temperature: {
    current: 24.5,
    min: 22,
    max: 28,
    unit: '°C',
    history: [23, 24, 24.5, 25, 24, 23.5, 24.5],
  },
  humidity: {
    current: 65,
    min: 60,
    max: 80,
    unit: '%',
    history: [62, 64, 65, 68, 67, 65, 65],
  },
  soilMoisture: {
    current: 45,
    min: 30,
    max: 70,
    unit: '%',
    history: [40, 42, 45, 44, 43, 45, 45],
  },
  light: {
    current: 850,
    min: 500,
    max: 1000,
    unit: 'lux',
    history: [800, 820, 850, 900, 880, 860, 850],
  },
}

// Son 7 günün tarihlerini oluştur
const last7Days = Array.from({ length: 7 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (6 - i))
  return date.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric' })
})

// Grafik verilerini hazırla
const chartData = last7Days.map((date, index) => ({
  date,
  "Sıcaklık (°C)": mockSensorData.temperature.history[index],
  "Nem (%)": mockSensorData.humidity.history[index],
  "Toprak Nemi (%)": mockSensorData.soilMoisture.history[index],
  "Işık (lux)": mockSensorData.light.history[index],
}))

const SensorCard = ({ title, data, icon, darkMode }) => {
  const getStatusColor = () => {
    if (data.current < data.min) return 'text-blue-600'
    if (data.current > data.max) return 'text-red-600'
    return 'text-green-600'
  }

  return (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} overflow-hidden shadow rounded-lg`}>
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-gray-400">{icon}</span>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className={`text-2xl font-semibold ${getStatusColor()}`}>
                  {data.current}
                  <span className="text-sm ml-1">{data.unit}</span>
                </div>
                <div className="ml-2 flex items-baseline text-sm font-semibold">
                  {data.min}-{data.max} {data.unit}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [sensorData, setSensorData] = useState(mockSensorData)
  const [darkMode, setDarkMode] = useState(false)

  // Gerçek uygulamada burada sensör verilerini çekebilirsiniz
  useEffect(() => {
    const interval = setInterval(() => {
      // Simüle edilmiş veri güncelleme
      setSensorData(prev => ({
        ...prev,
        temperature: {
          ...prev.temperature,
          current: +(prev.temperature.current + (Math.random() - 0.5)).toFixed(1),
        },
        humidity: {
          ...prev.humidity,
          current: +(prev.humidity.current + (Math.random() - 0.5)).toFixed(1),
        },
        soilMoisture: {
          ...prev.soilMoisture,
          current: +(prev.soilMoisture.current + (Math.random() - 0.5)).toFixed(1),
        },
        light: {
          ...prev.light,
          current: +(prev.light.current + (Math.random() * 10 - 5)).toFixed(0),
        },
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Sensör Verileri</h1>
          <p className="mt-2 text-sm text-gray-700">
            Sisteminizdeki sensörlerin anlık ve geçmiş verileri
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <SensorCard
          title="Sıcaklık"
          data={sensorData.temperature}
          icon={
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
          }
          darkMode={darkMode}
        />
        <SensorCard
          title="Nem"
          data={sensorData.humidity}
          icon={
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          }
          darkMode={darkMode}
        />
        <SensorCard
          title="Toprak Nemi"
          data={sensorData.soilMoisture}
          icon={
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3.0001V3.0001C16.9706 3.0001 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3.0001 12 3.0001V3.0001Z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8" />
            </svg>
          }
          darkMode={darkMode}
        />
        <SensorCard
          title="Işık"
          data={sensorData.light}
          icon={
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          darkMode={darkMode}
        />
      </div>

      {/* Sistem Durumu */}
      <div className="mt-8">
        <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white'} shadow rounded-lg p-6`}>
          <h2 className="text-lg font-medium text-gray-900">Sistem Durumu</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">Sulama Sistemi</div>
                <div className="text-sm text-gray-500">Aktif</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">Sensör Ağı</div>
                <div className="text-sm text-gray-500">Çalışıyor</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">İnternet Bağlantısı</div>
                <div className="text-sm text-gray-500">Bağlı</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Haftalık Veri Grafiği */}
      <div className="mt-8">
        <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white'} shadow rounded-lg p-6`}>
          <h2 className="text-lg font-medium text-gray-900 mb-6">Haftalık Sensör Verileri</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="Sıcaklık (°C)" stroke="#ef4444" />
                <Line yAxisId="left" type="monotone" dataKey="Nem (%)" stroke="#3b82f6" />
                <Line yAxisId="left" type="monotone" dataKey="Toprak Nemi (%)" stroke="#22c55e" />
                <Line yAxisId="right" type="monotone" dataKey="Işık (lux)" stroke="#f59e0b" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
} 