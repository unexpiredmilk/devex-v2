// git-case-breaker-patch-v1
import { useNavigate, useLocation } from 'react-router-dom';
import { Hexagon, BookOpenText, Trophy, Sun, Moon, CloudRain, Cpu } from '@phosphor-icons/react';
import avatarImg from '../assets/img/meswag.png';
import { useUIStore } from '../store/uiStore';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';
  
  const { theme, setTheme } = useUIStore();

  // Трехтактный переключатель
  const handleThemeCycle = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('rain');
    else setTheme('dark');
  };

  // Вычисление иконки и тултипа для следующего шага
  const getThemeConfig = () => {
    switch (theme) {
      case 'dark': return { icon: <Sun size={28} className="theme-toggle" />, label: "СВЕТЛАЯ ТЕМА" };
      case 'light': return { icon: <CloudRain size={28} className="theme-toggle" color="#38bdf8" weight="duotone" />, label: "НЕОНОВЫЙ ЛИВЕНЬ" };
      case 'rain': return { icon: <Moon size={28} className="theme-toggle" />, label: "ТЕМНАЯ ТЕМА" };
      default: return { icon: <Sun size={28} className="theme-toggle" />, label: "СВЕТЛАЯ ТЕМА" };
    }
  };

  const nextTheme = getThemeConfig();

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
        
        {/* Трехпозиционная кнопка темы */}
        <div className="nav-icon-wrapper" data-tooltip={nextTheme.label} onClick={handleThemeCycle}>
          {nextTheme.icon}
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
