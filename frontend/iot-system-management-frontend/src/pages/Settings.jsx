import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Settings() {
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: 'Ahmet Yazıcı',
      email: 'ahmet@yazici.com',
      phone: '+90 555 123 4567',
    }
  })

  const onSubmit = (data) => {
    console.log(data)
    console.log(notifications)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900">Ayarlar</h1>
        <p className="mt-2 text-sm text-gray-700">
          Hesap ve bildirim ayarlarınızı buradan yönetebilirsiniz.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
          {/* Profil Bilgileri */}
          <div>
            <h3 className="text-lg font-medium text-gray-900">Profil Bilgileri</h3>
            <div className="mt-6 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Ad soyad gereklidir' })}
                  className="input mt-1"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'E-posta gereklidir',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Geçersiz e-posta adresi',
                    },
                  })}
                  className="input mt-1"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone', {
                    required: 'Telefon numarası gereklidir',
                    pattern: {
                      value: /^(\+90|0)?\s*([0-9]{3})\s*([0-9]{3})\s*([0-9]{2})\s*([0-9]{2})$/,
                      message: 'Geçersiz telefon numarası',
                    },
                  })}
                  className="input mt-1"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Bildirim Ayarları */}
          <div>
            <h3 className="text-lg font-medium text-gray-900">Bildirim Ayarları</h3>
            <div className="mt-6 space-y-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="push"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="push" className="ml-3">
                  <span className="text-sm font-medium text-gray-900">Push Bildirimleri</span>
                  <p className="text-sm text-gray-500">Anlık bildirimler alın</p>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="email-notifications"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="email-notifications" className="ml-3">
                  <span className="text-sm font-medium text-gray-900">E-posta Bildirimleri</span>
                  <p className="text-sm text-gray-500">Günlük özet e-postaları alın</p>
                </label>
              </div>
            </div>
          </div>

          {/* Kaydet Butonu */}
          <div className="pt-6">
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => window.location.href = 'mailto:vtysiotsystem.management@gmail.com'}
                className="btn border border-gray-300"
              >
                Bize Ulaşın
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 