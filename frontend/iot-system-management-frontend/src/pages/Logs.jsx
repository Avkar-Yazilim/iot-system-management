import { useState, useEffect } from 'react'
import { SearchIcon, DownloadIcon } from '@heroicons/react/outline'
import userLogService from '../services/userLogService'

export default function Logs() {
  const [logs, setLogs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loglar yükleniyor...');
      const data = await userLogService.getAllUserLogs();
      console.log('Gelen log verileri:', data);
      
      if (!Array.isArray(data)) {
        console.error('Beklenmeyen veri formatı:', data);
        setError('Veri formatı hatalı');
        setLogs([]);
        return;
      }
      
      setLogs(data);
    } catch (err) {
      console.error('Log yükleme hatası:', err);
      setError(err.message || 'Loglar yüklenirken beklenmeyen bir hata oluştu');
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    if (!log) return false;
    return (log.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.action?.toLowerCase().includes(searchQuery.toLowerCase()))
  });

  console.log('Filtered Logs:', filteredLogs); // Filtrelenmiş logları kontrol et

  const downloadLogs = () => {
    try {
      // JSON dosyasını oluştur
      const jsonContent = JSON.stringify(logs, null, 2);
      
      // Blob oluştur
      const blob = new Blob([jsonContent], { type: 'application/json' });
      
      // İndirme bağlantısı oluştur
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      // Dosya adını ve tarihi ayarla
      const date = new Date().toISOString().split('T')[0];
      link.download = `kullanici-loglari-${date}.json`;
      
      link.href = url;
      document.body.appendChild(link);
      link.click();
      
      // Temizlik
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Loglar indirilirken hata oluştu:', error);
      alert('Loglar indirilirken bir hata oluştu!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full p-8">
        <div className="text-gray-600">Sistem kayıtları yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-full p-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={fetchLogs}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Yeniden Dene
        </button>
      </div>
    );
  }

  if (!logs.length) {
    return (
      <div className="flex justify-center items-center h-full p-8">
        <div className="text-gray-600">Sistem kaydı bulunmamaktadır.</div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Kullanıcı Logları</h1>
          <p className="mt-2 text-sm text-gray-700">
            Sistemde kullanıcıların gerçekleştirdiği tüm işlemlerin kayıtları
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={downloadLogs}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <DownloadIcon className="h-5 w-5 mr-2" />
            Logları İndir
          </button>
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
            placeholder="Kullanıcı adı veya işlem ara..."
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow ring-1 ring-black ring-opacity-5 md:rounded-lg`}>
              <table className={`min-w-full divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-300'}`}>
                <thead className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Kullanıcı
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Yapılan İşlem
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      İşlem Tarihi
                    </th>
                  </tr>
                </thead>
                <tbody className={`${darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
                  {filteredLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {log.username || 'Bilinmeyen Kullanıcı'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {log.action}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {log.timestamp ? new Date(log.timestamp).toLocaleString('tr-TR') : '-'}
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