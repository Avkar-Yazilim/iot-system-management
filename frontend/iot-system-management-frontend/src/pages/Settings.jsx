import { useEffect, useState } from "react";
import { settingsService } from "../services/settingsService";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    userAuthorization: "user",
    systemId: 1,
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await settingsService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Kullanıcılar yüklenirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser({
      ...user,
    });
  };

  const handleUpdateUser = async (userId, updatedData) => {
    try {
      console.log("Güncellenecek veriler:", updatedData);
      const currentUser = users.find((u) => u.userId === userId);
      const dataToUpdate = {
        ...currentUser,
        username: updatedData.username,
        email: updatedData.email,
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        userAuthorization: updatedData.userAuthorization,
      };

      console.log("Gönderilecek güncel veriler:", dataToUpdate);
      await settingsService.updateUser(userId, dataToUpdate);
      setEditingUser(null);
      loadUsers();
      alert("Kullanıcı başarıyla güncellendi!");
    } catch (error) {
      console.error("Güncelleme sırasında hata oluştu:", error);
      alert(
        `Güncelleme sırasında bir hata oluştu: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
      try {
        await settingsService.deleteUser(userId);
        loadUsers(); // Listeyi yenile
        alert("Kullanıcı başarıyla silindi!");
      } catch (error) {
        console.error("Silme işlemi sırasında hata oluştu:", error);
        alert("Silme işlemi sırasında bir hata oluştu!");
      }
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors = {};
    if (!newUser.username.trim()) {
      errors.username = "Kullanıcı adı boş bırakılamaz";
    }
    if (!newUser.email.trim()) {
      errors.email = "E-posta adresi boş bırakılamaz";
    } else if (!isValidEmail(newUser.email)) {
      errors.email = "Geçerli bir e-posta adresi giriniz";
    }
    if (!newUser.firstName.trim()) {
      errors.firstName = "Ad boş bırakılamaz";
    }
    if (!newUser.lastName.trim()) {
      errors.lastName = "Soyad boş bırakılamaz";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddUser = async () => {
    if (!validateForm()) {
      alert("Lütfen tüm alanları doğru şekilde doldurunuz!");
      return;
    }
    try {
      const userData = {
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        userAuthorization: newUser.userAuthorization,
        systemId: newUser.systemId,
        createBy: "admin",
      };
      await settingsService.createUser(userData);
      setShowAddUserModal(false);
      setNewUser({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        userAuthorization: "user",
        systemId: 1,
      });
      setValidationErrors({});
      loadUsers();
      alert("Kullanıcı başarıyla eklendi!");
    } catch (error) {
      console.error("Kullanıcı eklenirken hata oluştu:", error);
      alert(
        `Kullanıcı eklenirken bir hata oluştu: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleExportUsers = () => {
    try {
      // JSON dosyasını oluştur
      const jsonStr = JSON.stringify(users, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      // İndirme bağlantısı oluştur
      const a = document.createElement("a");
      a.href = url;
      a.download = "kullanicilar.json";
      document.body.appendChild(a);
      a.click();
      // Temizlik
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("JSON dışa aktarma hatası:", error);
      alert("Kullanıcı verileri dışa aktarılırken bir hata oluştu!");
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Kullanıcı Yönetimi
          </h1>
          <div className="space-x-3">
            <button
              onClick={handleExportUsers}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              JSON Olarak İndir
            </button>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Yeni Kullanıcı Ekle
            </button>
          </div>
        </div>

        {showAddUserModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-lg font-semibold mb-4">
                Yeni Kullanıcı Ekle
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Kullanıcı Adı
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border ${
                      validationErrors.username
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm p-2`}
                    value={newUser.username}
                    onChange={(e) =>
                      setNewUser({ ...newUser, username: e.target.value })
                    }
                  />
                  {validationErrors.username && (
                    <p className="mt-1 text-sm text-red-500">
                      {validationErrors.username}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    E-posta
                  </label>
                  <input
                    type="email"
                    className={`mt-1 block w-full border ${
                      validationErrors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm p-2`}
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {validationErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ad
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border ${
                      validationErrors.firstName
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm p-2`}
                    value={newUser.firstName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, firstName: e.target.value })
                    }
                  />
                  {validationErrors.firstName && (
                    <p className="mt-1 text-sm text-red-500">
                      {validationErrors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Soyad
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border ${
                      validationErrors.lastName
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm p-2`}
                    value={newUser.lastName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, lastName: e.target.value })
                    }
                  />
                  {validationErrors.lastName && (
                    <p className="mt-1 text-sm text-red-500">
                      {validationErrors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Yetki
                  </label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={newUser.userAuthorization}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        userAuthorization: e.target.value,
                      })
                    }
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  İptal
                </button>
                <button
                  onClick={handleAddUser}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Ekle
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Kullanıcı Adı
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        E-posta
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Ad
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Soyad
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Yetki
                      </th>
                      <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">İşlemler</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {users.map((user) => (
                      <tr key={user.userId}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {editingUser?.userId === user.userId ? (
                            <input
                              type="text"
                              className="input"
                              defaultValue={user.username}
                              onChange={(e) =>
                                setEditingUser({
                                  ...editingUser,
                                  username: e.target.value,
                                })
                              }
                            />
                          ) : (
                            user.username
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {editingUser?.userId === user.userId ? (
                            <input
                              type="email"
                              className="input"
                              defaultValue={user.email}
                              onChange={(e) =>
                                setEditingUser({
                                  ...editingUser,
                                  email: e.target.value,
                                })
                              }
                            />
                          ) : (
                            user.email
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {editingUser?.userId === user.userId ? (
                            <input
                              type="text"
                              className="input"
                              defaultValue={user.firstName}
                              onChange={(e) =>
                                setEditingUser({
                                  ...editingUser,
                                  firstName: e.target.value,
                                })
                              }
                            />
                          ) : (
                            user.firstName || "-"
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {editingUser?.userId === user.userId ? (
                            <input
                              type="text"
                              className="input"
                              defaultValue={user.lastName}
                              onChange={(e) =>
                                setEditingUser({
                                  ...editingUser,
                                  lastName: e.target.value,
                                })
                              }
                            />
                          ) : (
                            user.lastName || "-"
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {editingUser?.userId === user.userId ? (
                            <select
                              className="input"
                              value={editingUser.userAuthorization}
                              onChange={(e) =>
                                setEditingUser({
                                  ...editingUser,
                                  userAuthorization: e.target.value,
                                })
                              }
                            >
                              <option value="admin">admin</option>
                              <option value="user">user</option>
                            </select>
                          ) : (
                            user.userAuthorization
                          )}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {editingUser?.userId === user.userId ? (
                            <div className="space-x-2">
                              <button
                                onClick={() =>
                                  handleUpdateUser(user.userId, editingUser)
                                }
                                className="text-green-700 hover:text-green-900"
                              >
                                Kaydet
                              </button>
                              <button
                                onClick={() => setEditingUser(null)}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                İptal
                              </button>
                            </div>
                          ) : (
                            <div className="space-x-2">
                              <button
                                onClick={() => handleEditUser(user)}
                                className="text-green-700 hover:text-green-900"
                              >
                                Düzenle
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.userId)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Sil
                              </button>
                            </div>
                          )}
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
    </div>
  );
}