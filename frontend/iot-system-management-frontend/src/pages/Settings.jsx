import { useEffect, useState } from "react";
import { settingsService } from "../services/settingsService";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

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
    setEditingUser(user);
  };

  const handleUpdateUser = async (userId, updatedData) => {
    try {
      await settingsService.updateUser(userId, updatedData);
      setEditingUser(null);
      loadUsers(); // Listeyi yenile
      alert("Kullanıcı başarıyla güncellendi!");
    } catch (error) {
      console.error("Güncelleme sırasında hata oluştu:", error);
      alert("Güncelleme sırasında bir hata oluştu!");
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

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900">
          Kullanıcı Yönetimi
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Sistem kullanıcılarını buradan yönetebilirsiniz.
        </p>

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
                          {user.firstName || "-"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.lastName || "-"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.userAuthorization}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {editingUser?.userId === user.userId ? (
                            <div className="space-x-2">
                              <button
                                onClick={() =>
                                  handleUpdateUser(user.userId, editingUser)
                                }
                                className="text-indigo-600 hover:text-indigo-900"
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
                                className="text-indigo-600 hover:text-indigo-900"
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
