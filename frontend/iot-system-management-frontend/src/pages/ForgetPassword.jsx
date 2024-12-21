import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log('Password reset request for:', data.email);
      // Backend şifre sıfırlama isteği gönderilebilir
      // await passwordResetService.sendResetEmail(data.email);
      
      setSuccessMessage('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
      setErrorMessage('');
    } catch (error) {
      console.error('Password reset error:', error);
      setErrorMessage('Şifre sıfırlama işlemi başarısız oldu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white px-8 py-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Şifrenizi mi Unuttunuz?
          </h2>

          {successMessage && (
            <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'E-posta adresi gereklidir',
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
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Şifremi Yenile
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-indigo-600 hover:underline"
            >
              Giriş ekranına geri dön
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
