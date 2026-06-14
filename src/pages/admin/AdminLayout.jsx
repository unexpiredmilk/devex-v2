import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { SquaresFour, Users, Books, SignOut, CaretLeft, List, Hexagon, Sun, Moon } from '@phosphor-icons/react';
import { useUIStore } from '../../store/uiStore';
import './Admin.css'; 

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Достаем актуальные данные из обновленного стора
  const { theme, setTheme } = useUIStore();

  const isActive = (path) => location.pathname.includes(path) ? 'active' : '';

  return (
    <div className="admin-layout">
      
      <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        
        {/* Интегрированная шапка */}
        <div className="sidebar-header">
          <div className="admin-logo">
            <Hexagon size={28} weight="duotone" className="logo-icon" color="var(--admin-accent)" />
            <span className="logo-text">Дэшборд</span>
          </div>
          
          <div className="sidebar-toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <List size={22} weight="bold" /> : <CaretLeft size={20} weight="bold" />}
          </div>
        </div>

        <nav className="admin-nav">
          <NavItem icon={<SquaresFour size={22} />} label="Дашборд" active={isActive('/admin/dashboard')} onClick={() => navigate('/admin/dashboard')} />
          <NavItem icon={<Books size={22} />} label="Контент" active={isActive('/admin/courses')} onClick={() => navigate('/admin/courses')} />
          <NavItem icon={<Users size={22} />} label="Операторы" active={isActive('/admin/users')} onClick={() => navigate('/admin/users')} />
        </nav>

        <div className="admin-nav bottom">
          <NavItem 
            icon={theme === 'light' ? <Moon size={22} weight="duotone" /> : <Sun size={22} weight="duotone" />} 
            label={theme === 'light' ? "Темная тема" : "Светлая тема"} 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
          />
          <NavItem icon={<SignOut size={22} />} label="В Хаб" onClick={() => navigate('/')} className="danger" />
        </div>
      </aside>

      <main className="admin-content">
        <Outlet /> 
      </main>
      
    </div>
  );
}

// Компонент-помощник
function NavItem({ icon, label, active, onClick, className = "" }) {
  return (
    <div className={`nav-pill ${active} ${className}`} onClick={onClick} title={label}>
      <div className="nav-icon">{icon}</div>
      <span className="nav-label">{label}</span>
    </div>
  );
}