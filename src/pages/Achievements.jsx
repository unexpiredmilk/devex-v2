import { motion } from 'framer-motion';
// ИСПРАВЛЕНИЕ №1: Ампутированы суффиксы -Icon из Phosphor
import { Trophy, ShieldCheck, Timer, Lightning, GridFour, Ghost, Palette, Target, Code, Moon, Bug, Cpu, LockKey, LockKeyOpen } from '@phosphor-icons/react';
import { useUIStore } from '../store/uiStore';

const allAchievements = [
  { id: 'clean', title: 'Чистая компиляция', desc: 'Сдать задание без единой ошибки синтаксиса с первой попытки.', icon: ShieldCheck },
  { id: 'speed', title: 'Скоростной оператор', desc: 'Найти решение практической задачи быстрее чем за 60 секунд.', icon: Timer },
  { id: 'eco', title: 'Энергосбережение', desc: 'Успешно завершить модуль, не потратив ни одной ячейки АКБ.', icon: Lightning },
  { id: 'tags', title: 'Синтаксический хищник', desc: 'Интегрировать более 10 уникальных тегов в структуру одного документа.', icon: Target },
  { id: 'semantic', title: 'Архитектор сеток', desc: 'Использовать семантические теги <header>, <main> и <footer> в одном задании.', icon: GridFour },
  { id: 'ghost', title: 'Призрак в системе', desc: 'Найти и расшифровать скрытый комментарий в логах корпоративного задания.', icon: Ghost },
  { id: 'style', title: 'Стильный код', desc: 'Успешно применить CSS-стили к базовой HTML-разметке.', icon: Palette },
  { id: 'start', title: 'Инициализация', desc: 'Завершить первую главу базовой подготовки операторов.', icon: Code },
  { id: 'emmet_pro', title: 'Эммет-мастер', desc: 'Использовать имплант "Emmet-Инжектор" 15 раз за одну сессию.', icon: Cpu },
  { id: 'night', title: 'Ночная смена', desc: 'Скомпилировать рабочий код в период с 00:00 до 05:00 по локальному времени.', icon: Moon },
  { id: 'hunter', title: 'Охотник за багами', desc: 'Успешно исправить 5 критических ошибок, найденных Синтакс-Локатором.', icon: Bug },
  { id: 'full', title: 'Полная интеграция', desc: 'Установить все доступные аугментации одновременно.', icon: Trophy },
];

export default function Achievements() {
  const { operator } = useUIStore();
  
  // ИСПРАВЛЕНИЕ №2: Направляем селектор в правильную ячейку хранилища!
  const unlockedIDs = operator.unlockedAchievements || [];

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  return (
    <motion.main className="panel" style={{ flex: 1, padding: '40px', overflowY: 'auto' }} variants={containerVariants} initial="hidden" animate="show">
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-tech)', fontSize: '28px', color: 'var(--text-main)', marginBottom: '8px' }}>ВИТРИНА ДОСТИЖЕНИЙ</h1>
          <p style={{ color: 'var(--text-muted)' }}>Глобальный реестр системных наград и отличий.</p>
        </div>
        <div style={{ fontFamily: 'var(--font-tech)', fontSize: '18px', color: 'var(--accent-energy)' }}>ОТКРЫТО: {unlockedIDs.length} / {allAchievements.length}</div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {allAchievements.map((ach) => {
          const isUnlocked = unlockedIDs.includes(ach.id);
          const AchievementIcon = ach.icon;
          
          return (
            <motion.div 
              key={ach.id} variants={itemVariants} className="bento-card" 
              style={{ 
                backgroundColor: 'var(--bg-element)',
                border: `1px solid ${isUnlocked ? 'var(--accent-energy)' : 'var(--border-color)'}`,
                display: 'flex', flexDirection: 'column', padding: '24px', borderRadius: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px dashed var(--border-color)' }}>
                <div style={{ color: 'var(--accent-energy)', background: 'rgba(255, 107, 0, 0.1)', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AchievementIcon size={24} weight="duotone" />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontWeight: 500, fontSize: '16px', color: 'var(--text-main)', textTransform: 'uppercase' }}>{ach.title}</div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-tech)', fontSize: '11px', color: isUnlocked ? 'var(--accent-energy)' : 'var(--text-muted)' }}>
                    {/* ИСПРАВЛЕНИЕ №3: Иконки замков без суффиксов */}
                    {isUnlocked ? <LockKeyOpen size={14} weight="fill" /> : <LockKey size={14} weight="regular" />}
                    <span>{isUnlocked ? 'РАЗБЛОКИРОВАНО' : 'ЗАБЛОКИРОВАНО'}</span>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, flexGrow: 1 }}>{ach.desc}</div>
            </motion.div>
          );
        })}
      </div>
    </motion.main>
  );
}
