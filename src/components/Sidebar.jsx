import { useNavigate, useLocation } from 'react-router-dom';
import { Hexagon, BookOpenText, Trophy, Sun, Moon, Cpu } from '@phosphor-icons/react';
import avatarImg from '../assets/img/meswag.png';
import { useUIStore } from '../store/uiStore';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';
  
  // Берем setTheme из обновленного стора
  const { theme, setTheme } = useUIStore();

  return (
    <aside className="panel sidebar">
      <div className="nav-links">
        <div className="nav-icon-wrapper" data-tooltip="ГЛАВНАЯ">
          <Hexagon size={28} className="nav-item" onClick={() => navigate('/')} />
        </div>
        <div className="nav-icon-wrapper" data-tooltip="ТРЕНАЖЕР">
          <BookOpenText size={28} className={`nav-item ${isActive('/workspace')}`} onClick={() => navigate('/workspace')} />
        </div>
        <div className="nav-icon-wrapper" data-tooltip="ИМПЛАНТЫ">
          <Cpu size={28} className={`nav-item ${isActive('/implants')}`} onClick={() => navigate('/implants')} />
        </div>
        <div className="nav-icon-wrapper" data-tooltip="ДОСТИЖЕНИЯ">
          <Trophy 
            size={28} 
            className={`nav-item ${isActive('/achievements')}`} 
            onClick={() => navigate('/achievements')} 
          /> 
        </div>
      </div>
      
      {/* НИЖНИЙ БЛОК: Тема и Профиль */}
      <div className="nav-links" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Кнопка смены темы */}
        <div className="nav-icon-wrapper" data-tooltip={theme === 'light' ? "ТЕМНАЯ ТЕМА" : "СВЕТЛАЯ ТЕМА"}>
          {theme === 'light' ? (
            <Moon size={28} className="theme-toggle" onClick={() => setTheme('dark')} />
          ) : (
            <Sun size={28} className="theme-toggle" onClick={() => setTheme('light')} />
          )}
        </div>
        
        {/* Аватар */}
        <div className="nav-icon-wrapper" data-tooltip="ПРОФИЛЬ">
          <img 
            src={avatarImg} 
            alt="Avatar" 
            className={`avatar ${isActive('/profile')}`} 
            onClick={() => navigate('/profile')} 
          />
        </div>
        
      </div>
    </aside>
  );
}