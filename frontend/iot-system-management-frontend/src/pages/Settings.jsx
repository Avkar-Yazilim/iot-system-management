import { useForm } from "react-hook-form";

export default function Settings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "Ahmet Yazıcı",
      email: "ahmet@yazici.com",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900">Ayarlar</h1>
        <p className="mt-2 text-sm text-gray-700">
          Hesap ayarlarınızı buradan yönetebilirsiniz.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
          {/* Profil Bilgileri */}
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Profil Bilgileri
            </h3>
            <div className="mt-6 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ad Soyad
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Ad soyad gereklidir" })}
                  className="input mt-1"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "E-posta gereklidir",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Geçersiz e-posta adresi",
                    },
                  })}
                  className="input mt-1"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Şifre Güncelleme */}
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Şifre Güncelleme
            </h3>
            <div className="mt-6 space-y-6">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mevcut Şifre
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  {...register("currentPassword", { 
                    required: "Mevcut şifrenizi girmelisiniz" 
                  })}
                  className="input mt-1"
                />
                {errors.currentPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Yeni Şifre
                </label>
                <input
                  type="password"
                  id="newPassword"
                  {...register("newPassword", {
                    required: "Yeni şifre gereklidir",
                    minLength: {
                      value: 8,
                      message: "Şifre en az 8 karakter olmalıdır"
                    }
                  })}
                  className="input mt-1"
                />
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Yeni Şifre (Tekrar)
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Şifrenizi tekrar girmelisiniz",
                    validate: (value) => 
                      value === watch("newPassword") || "Şifreler eşleşmiyor"
                  })}
                  className="input mt-1"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Kaydet Butonu */}
          <div className="pt-6">
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() =>
                  (window.location.href =
                    "mailto:vtysiotsystem.management@gmail.com")
                }
                className="btn border border-gray-300"
              >
                Bize Ulaşın
              </button>
              <button type="submit" className="btn btn-primary">
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
