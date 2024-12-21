import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import { useTheme } from '../context/ThemeContext';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [resetError, setResetError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const onSubmit = async (data) => {
    try {
      setResetError('');
      setSuccessMessage('');
      
      // Email kontrolü ve şifre sıfırlama isteği
      const response = await userService.resetPassword(data.email);
      
      if (response.data?.message) {
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      if (error.response?.status === 404) {
        setResetError('Bu email adresi ile kayıtlı kullanıcı bulunamadı');
      } else {
        setResetError(error.response?.data?.message || 'Şifre sıfırlama işlemi başarısız oldu');
      }
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="w-full max-w-md p-6">
        <div className={`${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } px-8 py-6 rounded-xl shadow-2xl border ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        } transform transition-all duration-200`}>
          <h2 className={`text-2xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Şifre Sıfırlama
          </h2>

          {successMessage && (
            <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          {resetError && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {resetError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
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
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                Şifremi Sıfırla
              </button>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition-colors duration-200"
              >
                Giriş Sayfasına Dön
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}