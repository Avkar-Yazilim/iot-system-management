import { useForm } from 'react-hook-form'
import loginService from '../services/loginService'
import { useState } from 'react'

export default function Login({ onLogin }) {
  const { register, handleSubmit: submitForm, formState: { errors } } = useForm()
  const [loginError, setLoginError] = useState('')

  const onSubmit = async (data) => {
    try {
      setLoginError('')
      await loginService.login(data.email, data.password)
      onLogin()
    } catch (error) {
      setLoginError(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white px-8 py-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Tarla App'e Hoş Geldiniz
          </h2>
          
          {loginError && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {loginError}
            </div>
          )}

          <form onSubmit={submitForm(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'E-posta gereklidir',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Geçersiz e-posta adresi'
                  }
                })}
                className="input mt-1"
                placeholder="ornek@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                {...register('password', { 
                  required: 'Şifre gereklidir',
                  minLength: {
                    value: 6,
                    message: 'Şifre en az 6 karakter olmalıdır'
                  }
                })}
                className="input mt-1"
                placeholder="********"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Giriş Yap
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button 
              onClick={() => console.log('Google ile giriş')} 
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className="h-5 w-5 mr-2"
              />
              Google ile Devam Et
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 