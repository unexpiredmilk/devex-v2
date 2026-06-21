import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// ИСПРАВЛЕНИЕ: Иконка Users ампутирована за ненадобностью
import { SquaresFour, Books, SignOut, CaretLeft, List, Hexagon, Sun, Moon, CloudRain } from '@phosphor-icons/react';
import { useUIStore } from '../../store/uiStore';
import './Admin.css'; 

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const { theme, setTheme } = useUIStore();

  const isActive = (path) => location.pathname.includes(path) ? 'active' : '';

  // Трехтактный переключатель
  const handleThemeCycle = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('rain');
    else setTheme('dark');
  };

  const getThemeConfig = () => {
    switch (theme) {
      case 'dark': return { icon: <Sun size={22} weight="duotone" />, label: "Светлая тема" };
      case 'light': return { icon: <CloudRain size={22} color="#00f0ff" weight="duotone" />, label: "Неоновый ливень" };
      case 'rain': return { icon: <Moon size={22} weight="duotone" />, label: "Темная тема" };
      default: return { icon: <Sun size={22} weight="duotone" />, label: "Светлая тема" };
    }
  };

  const nextTheme = getThemeConfig();

  return (
    <div className="admin-layout">
      
      <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        
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
        </nav>

        <div className="admin-nav bottom">
          <NavItem 
            icon={nextTheme.icon} 
            label={nextTheme.label} 
            onClick={handleThemeCycle} 
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

function NavItem({ icon, label, active, onClick, className = "" }) {
  return (
    <div className={`nav-pill ${active} ${className}`} onClick={onClick} title={label}>
      <div className="nav-icon">{icon}</div>
      <span className="nav-label">{label}</span>
    </div>
  );
}
