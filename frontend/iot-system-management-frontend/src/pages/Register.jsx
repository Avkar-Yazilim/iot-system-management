import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import { registerService } from '../services/registerService';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [registerError, setRegisterError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [timer, setTimer] = useState(180);
  const [tempUserData, setTempUserData] = useState(null);
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  useEffect(() => {
    let interval;
    if (showOTPModal && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowOTPModal(false);
      setRegisterError('OTP süresi doldu. Lütfen tekrar deneyin.');
    }
    return () => clearInterval(interval);
  }, [showOTPModal, timer]);

  const onSubmit = async (data) => {
    try {
      await registerService.sendOTP(data.email);
      setTempUserData(data);
      setShowOTPModal(true);
      setTimer(180); 
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      await registerService.verifyOTP(tempUserData.email, otpValue);
      
      try {
        const userData = {
          username: tempUserData.username,
          firstName: tempUserData.firstName,
          lastName: tempUserData.lastName,
          email: tempUserData.email,
          createBy: "system",
          passwordHash: tempUserData.password,
          userAuthorization: "user"
        };

        await registerService.register(userData);
        
        setShowOTPModal(false);
        navigate('/login', { 
          state: { 
            registerSuccess: true,
            message: 'Kayıt başarılı! Giriş yapabilirsiniz.'
          }
        });

      } catch (error) {
        setRegisterError('Kayıt işlemi sırasında bir hata oluştu');
        console.error('Registration error:', error);
      }
    } catch (error) {
      setRegisterError('OTP doğrulaması başarısız');
      console.error('OTP verification error:', error);
    }
  };

  const OTPModal = () => {
    const inputRef = useRef(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
          <h3 className="text-lg font-semibold mb-4">Email Doğrulama</h3>
          <p className="text-sm text-gray-600 mb-4">
            Email adresinize gönderilen 6 haneli kodu giriniz.
            <br />
            Kalan süre: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </p>
          <input
            ref={inputRef}
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Doğrulama Kodu"
            value={otpValue}
            onChange={(e) => setOtpValue(e.target.value)}
            maxLength={6}
            autoFocus // Otomatik focus ekle
          />
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              onClick={() => setShowOTPModal(false)}
            >
              İptal
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleOTPSubmit}
            >
              Doğrula
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="w-full max-w-md p-6">
        <div className={`${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-xl shadow-2xl border ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        } p-8 transform transition-all duration-200`}>
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Kayıt Ol
            </h2>
          </div>

          {registerError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {registerError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Kullanıcı Adı</label>
              <input
                type="text"
                {...register('username', { required: 'Kullanıcı adı gereklidir' })}
                className="input mt-1"
                placeholder="kullaniciadi"
              />
              {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">İsim</label>
              <input
                type="text"
                {...register('firstName', { required: 'İsim gereklidir' })}
                className="input mt-1"
                placeholder="İsim"
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Soyisim</label>
              <input
                type="text"
                {...register('lastName', { required: 'Soyisim gereklidir' })}
                className="input mt-1"
                placeholder="Soyisim"
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email gereklidir',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Geçersiz email adresi'
                  }
                })}
                className="input mt-1"
                placeholder="ornek@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Şifre</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register('password', {
                    required: 'Şifre gereklidir',
                    minLength: { value: 6, message: 'Şifre en az 6 karakter olmalıdır' }
                  })}
                  className="input mt-1 w-full pr-10"
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Şifre Tekrar</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register('confirmPassword', {
                    required: 'Şifre tekrarı gereklidir',
                    validate: value => value === watch('password') || 'Şifreler eşleşmiyor'
                  })}
                  className="input mt-1 w-full pr-10"
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Kayıt Ol
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className={`text-sm ${
                darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'
              }`}
            >
              Zaten hesabın var mı? Giriş yap
            </button>
          </div>
        </div>
      </div>
      {showOTPModal && <OTPModal />}
    </div>
  );
}
