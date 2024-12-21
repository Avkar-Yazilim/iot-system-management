import { useForm } from 'react-hook-form'
import loginService from '../services/loginService'
import { useState, useEffect } from 'react'
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/fireBase';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login({ onLogin }) {
  const { register, handleSubmit: submitForm, formState: { errors } } = useForm()
  const [loginError, setLoginError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.registerSuccess) {
      setSuccessMessage('Kayıt başarılı! Lütfen giriş yapın.');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }
  }, [location]);

  const onSubmit = async (data) => {
    try {
      console.log('Login attempt with:', data);

      const loginData = {
        email: data.email,
        passwordHash: data.password
      };

      const user = await loginService.login(loginData);
      console.log('Login response:', user);

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      onLogin();
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.message || 'Giriş başarısız');
    }
  }

  const handleGoogleLogin = async () => {
    try {
        console.log('Google login başlatılıyor...');
        const result = await signInWithPopup(auth, googleProvider);
        
        // Backend'e sadece gerekli dataları gönder
        const googleUserData = {
            email: result.user.email,
            displayName: result.user.displayName,
            uid: result.user.uid
        };
        
        console.log('Backend\'e gönderilecek data:', googleUserData);

        const response = await loginService.googleLogin(googleUserData);
        console.log('Backend\'den gelen yanıt:', response);

        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem('isAuthenticated', 'true');
        onLogin();
    } catch (error) {
        console.error('Google login hatası:', error);
        setLoginError(error.message || 'Google ile giriş yapılırken bir hata oluştu');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white px-8 py-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Tarla App'e Hoş Geldiniz
          </h2>
          
          {successMessage && (
            <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
              {successMessage}
            </div>
          )}

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
              <div className="text-right mt-1">
                <button
                  type="button"
                  onClick={() => navigate('/forget-password')}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Şifreni mi unuttun?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Giriş Yap
              </button>
            </div>

            <div className="mt-3">
              <button
                type="button"
                onClick={handleRegisterClick}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Kayıt Ol
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button 
              onClick={handleGoogleLogin} 
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