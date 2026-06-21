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
import AdminGuard from './components/AdminGuard';
import AdminLayout from './pages/admin/AdminLayout';
import AdminCourses from './pages/admin/AdminCourses';
import AdminCourseDetails from './pages/admin/AdminCourseDetails';
import AdminDashboard from './pages/admin/AdminDashboard';

// Компонент AdminPlaceholder вычищен за отсутствием ссылающихся роутов

const MainLayout = () => {
  const isAuthenticated = useUIStore(state => state.operator?.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Sidebar />
      <Outlet /> 
    </>
  );
};

export default function App() {
  const theme = useUIStore(state => state.theme);
  
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

      {/* --- АДМИН-ПАНЕЛЬ С ЗАЩИТОЙ И АВТО-РЕДИРЕКТОМ НА ДАШБОРД --- */}
      <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="courses/:id" element={<AdminCourseDetails />} />
      </Route>
    </Routes>
  );
}
