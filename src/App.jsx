import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUIStore } from './store/uiStore';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Workspace from './pages/Workspace';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';
import Implants from './pages/Implants';

// Импорты админки
import AdminLayout from './pages/admin/AdminLayout';
import AdminCourses from './pages/admin/AdminCourses';
import AdminCourseDetails from './pages/admin/AdminCourseDetails';
import AdminDashboard from './pages/admin/AdminDashboard';

const AdminPlaceholder = ({ title }) => <div style={{ fontSize: '24px', fontWeight: 'bold', padding: '24px', color: 'var(--text-main)' }}>{title} (В разработке)</div>;

const MainLayout = () => {
  // Проверяем флаг авторизации из объекта operator
  const isAuthenticated = useUIStore(state => state.operator?.isAuthenticated);

  // Если нет допуска — жестко отбрасываем на страницу входа
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Если допуск есть — рендерим интерфейс
  return (
    <>
      <Sidebar />
      <Outlet /> 
    </>
  );
};

export default function App() {
  const theme = useUIStore(state => state.theme);

  // ВОТ ОН - ГЛОБАЛЬНЫЙ ПЕРЕХВАТЧИК ТЕМЫ
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

return (
    <Routes>
      {/* --- ОТКРЫТАЯ ЗОНА --- */}
      <Route path="/login" element={<Login />} />

      {/* --- ЗАЩИЩЕННАЯ БАЗА --- */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Workspace />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/implants" element={<Implants />} />
      </Route>

      {/* --- АДМИН-ПАНЕЛЬ --- */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="courses/:id" element={<AdminCourseDetails />} />
        <Route path="users" element={<AdminPlaceholder title="Операторы" />} />
      </Route>
    </Routes>
  );
}