import { motion } from 'framer-motion';
import { Coins, Code, Lightning, ShieldCheck, Timer, Target, GridFour, Ghost, Palette, Moon, Bug, Cpu, Trophy } from '@phosphor-icons/react';
import { useUIStore } from '../store/uiStore';
import avatarImg from '../assets/img/meswag.png';

const achievementsMap = {
  'clean': { title: 'Чистая компиляция', desc: 'Без единой ошибки синтаксиса', icon: <ShieldCheck size={24} weight="duotone" color="var(--accent-energy)" />, date: '12.10.2025' },
  'speed': { title: 'Скоростной оператор', desc: 'Меньше 60 секунд', icon: <Timer size={24} weight="duotone" color="var(--accent-energy)" />, date: '14.10.2025' },
  'eco': { title: 'Энергосбережение', desc: 'Без затрат АКБ', icon: <Lightning size={24} weight="duotone" color="var(--accent-energy)" />, date: '15.10.2025' },
  'tags': { title: 'Синтаксический хищник', desc: '10 уникальных тегов', icon: <Target size={24} weight="duotone" color="var(--accent-energy)" />, date: '16.10.2025' },
  'semantic': { title: 'Архитектор сеток', desc: 'Соблюдена семантика', icon: <GridFour size={24} weight="duotone" color="var(--accent-energy)" />, date: '18.10.2025' },
  'ghost': { title: 'Призрак в системе', desc: 'Скрытый код обнаружен', icon: <Ghost size={24} weight="duotone" color="var(--accent-energy)" />, date: '19.10.2025' },
  'style': { title: 'Стильный код', desc: 'Применение CSS', icon: <Palette size={24} weight="duotone" color="var(--accent-energy)" />, date: '20.10.2025' },
  { 'start': { title: 'Инициализация', desc: 'Первая глава завершена', icon: <Code size={24} weight="duotone" color="var(--accent-energy)" />, date: '21.10.2025' },
  'emmet_pro': { title: 'Эммет-мастер', desc: 'Использовано 15 раз', icon: <Cpu size={24} weight="duotone" color="var(--accent-energy)" />, date: '22.10.2025' },
  'night': { title: 'Ночная смена', desc: 'С 00:00 до 05:00', icon: <Moon size={24} weight="duotone" color="var(--accent-energy)" />, date: '23.10.2025' },
  'hunter': { title: 'Охотник за багами', desc: 'Ошибки исправлены', icon: <Bug size={24} weight="duotone" color="var(--accent-energy)" />, date: '24.10.2025' },
  'full': { title: 'Полная интеграция', desc: 'Установлены все модули', icon: <Trophy size={24} weight="duotone" color="var(--accent-energy)" />, date: '25.10.2025' },
};

export default function Profile() {
  const { operator } = useUIStore();

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  // ИСПРАВЛЕНИЕ: Направили луч захвата в реальную ячейку operator.unlockedAchievements
  const safeAchievements = operator?.unlockedAchievements || [];
  const maxAchievements = 12; 
  const progressPercentage = (safeAchievements.length / maxAchievements) * 100;

  const renderPixelBar = (currentValue, maxValue, totalBlocks = 25) => {
    const filledBlocks = Math.floor((currentValue / maxValue) * totalBlocks);
    const blocks = [];
    for (let i = 0; i < totalBlocks; i++) {
      const isFilled = i < filledBlocks;
      blocks.push(
        <div key={i} style={{ width: '8px', height: '14px', backgroundColor: isFilled ? 'var(--accent-energy)' : 'var(--bg-element)', border: `1px solid ${isFilled ? 'var(--accent-energy)' : 'var(--border-color)'}`, boxShadow: isFilled ? '0 0 8px rgba(255, 107, 0, 0.4)' : 'none', transition: 'all 0.3s' }} />
      );
    }
    return <div style={{ display: 'flex', gap: '2px', marginTop: '12px', flexWrap: 'wrap' }}>{blocks}</div>;
  };

  return (
    <motion.main className="panel profile-dashboard" variants={containerVariants} initial="hidden" animate="show">
      
      {/* СТРОКА 1 */}
      <motion.div variants={itemVariants} className="dashboard-card card-identity" style={{ gridColumn: 'span 6' }}>
        <img src={avatarImg} alt="Avatar" className="profile-avatar" />
        <div className="identity-info" style={{ flex: 1 }}>
          <h1>{operator?.name || 'OPERATOR'}</h1>
          <h2>{operator?.handle || '@unknown'}</h2>
          <div style={{ marginTop: '16px', borderTop: '1px dashed var(--border-color)', paddingTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-tech)', fontSize: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>УРОВЕНЬ {operator?.level || 1}</span>
              <span style={{ color: 'var(--accent-energy)' }}>{operator?.exp || 0} / 100 EXP</span>
            </div>
            {renderPixelBar(operator?.exp || 0, 100)}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="dashboard-card card-tokens" style={{ gridColumn: 'span 3' }}>
        <Coins size={42} color="var(--accent-energy)" weight="duotone" />
        <div className="token-amount" style={{ fontSize: '48px' }}>{operator?.tokens || 0}</div>
        <div className="token-label">Баланс токенов</div>
      </motion.div>

      <motion.div variants={itemVariants} className="dashboard-card card-stats" style={{ gridColumn: 'span 3' }}>
        <div className="header-tech" style={{ marginBottom: '12px', border: 'none' }}>СИСТЕМНЫЕ ЛОГИ</div>
        <div className="stat-row"><span className="stat-label">Решено</span><span className="stat-value">{operator?.stats?.solvedModules || 0}</span></div>
        <div className="stat-row"><span className="stat-label">Компиляций</span><span className="stat-value">{operator?.stats?.cleanCompilations || 0}</span></div>
        <div className="stat-row"><span className="stat-label">Дней</span><span className="stat-value">{operator?.stats?.daysInSystem || 1}</span></div>
      </motion.div>

      {/* СТРОКА 2: Ачивки */}
      <motion.div variants={itemVariants} className="dashboard-card card-showcase" style={{ gridColumn: 'span 12' }}>
        <div className="progress-header">
          <span>РАЗБЛОКИРОВАНО ДОСТИЖЕНИЙ</span>
          <span style={{ color: 'var(--accent-energy)' }}>{safeAchievements.length} / {maxAchievements}</span>
        </div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div></div>
        
        <div className="mini-bento" style={{ marginTop: '16px' }}>
          {safeAchievements.map((id) => {
            const ach = achievementsMap[id];
            if (!ach) return null;
            return (
              <div key={id} className="achievement-wrapper" data-tooltip={ach.desc}>
                <div className="mini-card">
                  <div className="mini-icon">{ach.icon}</div>
                  <div className="mini-info">
                    <span className="mini-title">{ach.title}</span>
                    <span className="mini-date">{ach.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {safeAchievements.length === 0 && <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Нет разблокированных достижений...</div>}
        </div>
      </motion.div>

      {/* СТРОКА 3: Оборудование (добавлен flexWrap: 'wrap' для мобилок) */}
      <motion.div variants={itemVariants} className="dashboard-card" style={{ gridColumn: 'span 12' }}>
        <div className="header-tech" style={{ marginBottom: '16px', border: 'none' }}>УСТАНОВЛЕННОЕ ОБОРУДОВАНИЕ</div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {operator?.unlockedImplants && operator.unlockedImplants.length > 0 ? operator.unlockedImplants.map(id => (
            <div key={id} className="mini-card" style={{ border: '1px solid var(--accent-energy)', width: '220px' }}>
               <div className="mini-icon">
                 {id === 'emmet' && <Lightning color="var(--accent-energy)" weight="duotone" />}
                 {id === 'locator' && <Bug color="var(--accent-energy)" weight="duotone" />}
                 {id === 'cassie' && <Cpu color="var(--accent-energy)" weight="duotone" />}
               </div>
               <div className="mini-info">
                 <span className="mini-title">{id.toUpperCase()}</span>
                 <span style={{ fontSize: '10px', color: 'var(--accent-energy)' }}>АКТИВЕН В СИСТЕМЕ</span>
               </div>
            </div>
          )) : <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Аугментации не обнаружены.</p>}
        </div>
      </motion.div>

    </motion.main>
  );
}
