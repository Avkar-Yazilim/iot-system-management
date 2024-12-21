import { useForm } from 'react-hook-form'
import loginService from '../services/loginService'
import { useState, useEffect } from 'react'
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/fireBase';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.png';

export default function Login({ onLogin }) {
  const { register, handleSubmit: submitForm, formState: { errors } } = useForm()
  const [loginError, setLoginError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();

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
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="w-full max-w-md">
        <div className={`px-8 py-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Tarla App'e Hoş Geldiniz
          </h2>

          <div className="flex justify-center mb-8">
            <img 
              src={logo} 
              alt="Tarla App Logo" 
              className="w-32 h-32 object-contain"
            />
          </div>
          
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
              <label htmlFor="password" className={`block text-sm font-medium ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
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
                  className={`text-sm ${
                    darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'
                  }`}
                >
                  Şifreni mi unuttun?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-green-600 hover:bg-green-700 focus:ring-green-600' 
                    : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
                } focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                Giriş Yap
              </button>
            </div>

            <div className="mt-3">
              <button
                type="button"
                onClick={handleRegisterClick}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-green-800 hover:bg-green-900 focus:ring-green-800' 
                    : 'bg-green-700 hover:bg-green-800 focus:ring-green-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                Kayıt Ol
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button 
              onClick={handleGoogleLogin} 
              className={`w-full flex items-center justify-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md transition-colors duration-200 ${
                darkMode 
                  ? 'border-gray-600 text-gray-200 bg-gray-700 hover:bg-gray-600' 
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-100'
              }`}
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

      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
            darkMode 
              ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title={darkMode ? 'Açık temaya geç' : 'Koyu temaya geç'}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
} 