import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo.png";

const navigation = [
  { name: "Ana Sayfa", to: "/home", icon: "home", adminOnly: false },
  { name: "Cihazlar", to: "/devices", icon: "device", adminOnly: false },
  { name: "Program", to: "/schedule", icon: "calendar", adminOnly: false },
  {
    name: "Program Listesi",
    to: "/schedule-list",
    icon: "list",
    adminOnly: false,
  },
  { name: "Geçmiş", to: "/logs", icon: "clock", adminOnly: true },
  {
    name: "Kullanıcı Yönetim Paneli",
    to: "/settings",
    icon: "settings",
    adminOnly: true,
  },
];

const icons = {
  home: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  ),
  device: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  ),
  calendar: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  list: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 10h16M4 14h16M4 18h16"
      />
    </svg>
  ),
  clock: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  settings: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  menu: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  ),
  close: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  logout: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  ),
  lightMode: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  ),
  darkMode: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  ),
};

export default function Dashboard({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    // User ve authentication bilgilerini temizle
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    onLogout();
  };

  return (
    <div
      className={`h-screen flex overflow-hidden ${
        darkMode ? "dark bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Mobile sidebar */}
      <div
        className={`
        fixed inset-0 flex z-40 lg:hidden
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 ease-in-out
      `}
      >
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <SidebarContent
            currentPath={location.pathname}
            onLogout={handleLogout}
            setSidebarOpen={setSidebarOpen}
          />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
            <SidebarContent
              currentPath={location.pathname}
              onLogout={handleLogout}
              setSidebarOpen={setSidebarOpen}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto focus:outline-none">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            {icons.menu}
          </button>
        </div>
        <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Theme toggle button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
            darkMode
              ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          title={darkMode ? "Açık temaya geç" : "Koyu temaya geç"}
        >
          {darkMode ? icons.lightMode : icons.darkMode}
        </button>
      </div>
    </div>
  );
}

function SidebarContent({ currentPath, onLogout, setSidebarOpen }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  // Admin ve normal kullanıcı için farklı navigation
  const filteredNavigation = navigation.filter(
    (item) => !item.adminOnly || user?.userAuthorization === "admin"
  );

  // Yeni fonksiyon: sidebar'ı kapat
  const handleNavClick = () => {
    setSidebarOpen(false); // Sidebar'ı kapat
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col items-center flex-shrink-0 px-4 pb-5 relative">
        <button
          className="lg:hidden absolute right-0 top-0 p-2 text-gray-500 hover:text-gray-700"
          onClick={() => setSidebarOpen(false)}
        >
          {icons.close}
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Tarla App</h1>
        <img
          src={logo}
          alt="Tarla App Logo"
          className="mt-4 w-32 h-32 object-contain"
        />
      </div>
      <nav className="mt-8 flex-1 px-2 space-y-1">
        {filteredNavigation.map((item) => {
          const isActive =
            currentPath === item.to ||
            (item.to === "/home" && currentPath === "/home") ||
            (item.to === "/schedule" && currentPath === "/schedule") ||
            (item.to === "/schedule-list" &&
              currentPath === "/schedule-list") ||
            (item.to !== "/home" &&
              item.to !== "/schedule" &&
              item.to !== "/schedule-list" &&
              currentPath.startsWith(item.to));

          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-green-100 text-primary-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              end={item.to === "/"}
              onClick={handleNavClick}
            >
              <span
                className={`mr-3 flex-shrink-0 ${
                  isActive
                    ? "text-green-600"
                    : "text-gray-400 group-hover:text-gray-500"
                }`}
              >
                {icons[item.icon]}
              </span>
              {item.name}
            </NavLink>
          );
        })}
      </nav>
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <button onClick={onLogout} className="flex-shrink-0 w-full group block">
          <div className="flex items-center">
            <div>
              <span className="text-gray-400 group-hover:text-gray-500">
                {icons.logout}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Çıkış Yap
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
