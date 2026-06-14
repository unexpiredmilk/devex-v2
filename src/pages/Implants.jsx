import { motion } from 'framer-motion';
import { TerminalWindow, Bug, Robot, Lightning, CheckCircle, WarningCircle, BatteryFull } from '@phosphor-icons/react';
import { useUIStore } from '../store/uiStore';

const implantsData = [
  { id: 'emmet', name: 'Emmet-Инжектор', icon: <TerminalWindow size={48} color="var(--accent-energy)" weight="duotone" />, cost: 5, energyCost: '1 АКБ', desc: 'Нейронный транслятор аббревиатур. Позволяет разворачивать HTML-структуры за миллисекунды.', features: ['Boilerplate генерация (!)', 'Авто-вложенность (>)'] },
  { id: 'locator', name: 'Синтакс-Локатор', icon: <Bug size={48} color="var(--text-main)" weight="duotone" />, cost: 12, energyCost: 'Пассив', desc: 'Анализатор дерева DOM в реальном времени. Предотвращает ошибки компиляции.', features: ['Подсветка незакрытых тегов', 'Валидация атрибутов'] },
  { id: 'cassie', name: 'Корректор "Кэсси"', icon: <Robot size={48} color="var(--text-main)" weight="duotone" />, cost: 25, energyCost: '3 АКБ', desc: 'Экспериментальный ИИ-ассистент. Выдает прямую текстовую подсказку в терминал.', features: ['Контекстный анализ кода', 'Объяснение ошибок'] }
];

export default function Implants() {
  const { operator, purchaseImplant } = useUIStore();

  const handlePurchase = (implant) => {
    if (operator.unlockedImplants.includes(implant.id)) return;
    if (operator.tokens >= implant.cost) purchaseImplant(implant.id, implant.cost);
  };

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  return (
    <motion.main className="panel" style={{ flex: 1, padding: '32px', overflowY: 'auto' }} variants={containerVariants} initial="hidden" animate="show">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-tech)', fontSize: '28px', color: 'var(--text-main)', marginBottom: '8px' }}>КИБЕР-КЛИНИКА // АУГМЕНТАЦИИ</h1>
          <p style={{ color: 'var(--text-muted)' }}>Установка сторонних модулей ускоряет процесс написания кода.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-element)', padding: '12px 24px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '14px', fontFamily: 'var(--font-tech)' }}>БАЛАНС:</span>
          <span style={{ color: 'var(--accent-energy)', fontSize: '24px', fontFamily: 'var(--font-tech)' }}>{operator.tokens} TKN</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {implantsData.map((implant) => {
          const isUnlocked = operator.unlockedImplants.includes(implant.id);
          const canAfford = operator.tokens >= implant.cost;

          return (
            <motion.div key={implant.id} variants={itemVariants} className="implant-card" style={{ backgroundColor: 'var(--bg-element)', border: `1px solid ${isUnlocked ? 'var(--accent-energy)' : 'var(--border-color)'}`, borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', cursor: isUnlocked ? 'default' : 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ backgroundColor: 'var(--bg-panel)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>{implant.icon}</div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-tech)', marginBottom: '4px' }}>СТОИМОСТЬ</div>
                  <div style={{ fontSize: '20px', color: isUnlocked ? 'var(--text-muted)' : 'var(--text-main)', fontFamily: 'var(--font-tech)', textDecoration: isUnlocked ? 'line-through' : 'none' }}>{implant.cost} TKN</div>
                </div>
              </div>

              {/* БЕЙДЖ ЭНЕРГИИ */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--bg-panel)', border: '1px solid var(--border-color)', padding: '4px 8px', borderRadius: '4px', alignSelf: 'flex-start', marginBottom: '16px', fontSize: '11px', fontFamily: 'var(--font-tech)', color: 'var(--accent-energy)' }}>
                 <BatteryFull size={14} /> ЗАТРАТЫ: {implant.energyCost}
              </div>

              <h2 style={{ fontSize: '20px', color: 'var(--text-main)', marginBottom: '12px' }}>{implant.name}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', marginBottom: '20px', flex: 1 }}>{implant.desc}</p>

              {isUnlocked ? (
                <button disabled style={{ width: '100%', padding: '12px', background: 'rgba(0, 255, 0, 0.1)', border: '1px solid #00ff00', color: '#00ff00', borderRadius: '6px', fontFamily: 'var(--font-tech)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'default' }}>
                  <CheckCircle weight="fill" /> УСТАНОВЛЕНО
                </button>
              ) : (
                <button disabled={!canAfford} onClick={() => handlePurchase(implant)} style={{ width: '100%', padding: '12px', background: canAfford ? 'transparent' : 'var(--bg-panel)', border: `1px solid ${canAfford ? 'var(--accent-energy)' : 'var(--border-color)'}`, color: canAfford ? 'var(--accent-energy)' : 'var(--text-muted)', borderRadius: '6px', cursor: canAfford ? 'pointer' : 'not-allowed', fontFamily: 'var(--font-tech)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', transition: '0.2s' }}>
                  {canAfford ? <><Lightning weight="fill" /> ИНТЕГРИРОВАТЬ</> : <><WarningCircle /> НЕДОСТАТОЧНО TKN</>}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.main>
  );
}