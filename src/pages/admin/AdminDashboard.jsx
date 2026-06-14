import { Users, BookBookmark, Cpu, Lightning } from '@phosphor-icons/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useUIStore } from '../../store/uiStore';

// --- Фейковые данные для графиков (Для красивых скриншотов в диплом) ---
const activityData = [
  { name: 'Пн', activity: 120, compilations: 450 },
  { name: 'Вт', activity: 180, compilations: 580 },
  { name: 'Ср', activity: 250, compilations: 710 },
  { name: 'Чт', activity: 210, compilations: 620 },
  { name: 'Пт', activity: 290, compilations: 850 },
  { name: 'Сб', activity: 380, compilations: 1020 },
  { name: 'Вс', activity: 420, compilations: 1150 },
];

const vectorDistribution = [
  { name: 'HTML Фундамент', value: 45 },
  { name: 'CSS Аугментация', value: 30 },
  { name: 'JS Логика', value: 25 },
];

const COLORS = ['var(--admin-accent)', '#3b82f6', '#8b5cf6'];

export default function AdminDashboard() {
  const { operator, injectResources, resetProgress } = useUIStore();
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0', color: 'var(--admin-text-main)' }}>Обзор Системы</h1>
        <p style={{ color: 'var(--admin-text-muted)', margin: 0 }}>Глобальная статистика и телеметрия обучающих векторов.</p>
      </div>

      {/* КАРТОЧКИ МЕТРИК */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        
        <div style={{ background: 'var(--admin-bg-panel)', border: '1px solid var(--admin-border)', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(234, 88, 12, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-accent)' }}>
            <Users size={28} weight="duotone" />
          </div>
          <div>
            <div style={{ color: 'var(--admin-text-muted)', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>АКТИВНЫЕ ОПЕРАТОРЫ</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--admin-text-main)' }}>1,204</div>
          </div>
        </div>

        <div style={{ background: 'var(--admin-bg-panel)', border: '1px solid var(--admin-border)', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
            <BookBookmark size={28} weight="duotone" />
          </div>
          <div>
            <div style={{ color: 'var(--admin-text-muted)', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>ДОСТУПНЫЕ ВЕКТОРЫ</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--admin-text-main)' }}>3</div>
          </div>
        </div>

        <div style={{ background: 'var(--admin-bg-panel)', border: '1px solid var(--admin-border)', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
            <Cpu size={28} weight="duotone" />
          </div>
          <div>
            <div style={{ color: 'var(--admin-text-muted)', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>УСПЕШНЫХ КОМПИЛЯЦИЙ</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--admin-text-main)' }}>98.4%</div>
          </div>
        </div>

        <div style={{ background: 'var(--admin-bg-panel)', border: '1px solid var(--admin-border)', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(234, 179, 8, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#eab308' }}>
            <Lightning size={28} weight="duotone" />
          </div>
          <div>
            <div style={{ color: 'var(--admin-text-muted)', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>РАСХОД ЭНЕРГИИ (АКБ)</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--admin-text-main)' }}>45K</div>
          </div>
        </div>

      </div>

      {/* СЕТКА ГРАФИКОВ */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', height: '400px' }}>
        
        {/* Главный график активности */}
        <div style={{ background: 'var(--admin-bg-panel)', border: '1px solid var(--admin-border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--admin-text-main)', marginBottom: '24px' }}>Телеметрия онлайна (7 дней)</h2>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--admin-accent)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--admin-accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--admin-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--admin-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: 'var(--admin-accent)' }}
                />
                <Area type="monotone" dataKey="activity" stroke="var(--admin-accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorActivity)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Круговая диаграмма распределения */}
        <div style={{ background: 'var(--admin-bg-panel)', border: '1px solid var(--admin-border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--admin-text-main)', marginBottom: '24px' }}>Популярность векторов</h2>
          <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={vectorDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {vectorDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            {vectorDistribution.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--admin-text-main)' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: COLORS[idx] }} />
                  {item.name}
                </div>
                <span style={{ color: 'var(--admin-text-muted)', fontWeight: '600' }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SYSTEM OVERRIDE SECTION */}
      <div style={{ background: 'var(--admin-bg-panel)', border: '1px dashed #ff3333', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#ff3333', marginBottom: '16px' }}>SYSTEM OVERRIDE (Читы)</h2>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, color: 'var(--admin-text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
            <p><strong>Оператор:</strong> {operator?.name || 'Нет данных'}</p>
            <p><strong>Уровень:</strong> {operator?.level}</p>
            <p><strong>Опыт:</strong> {operator?.exp} / 100</p>
            <p><strong>Токены:</strong> {operator?.tokens}</p>
            <p><strong>Энергия:</strong> {operator?.energy}</p>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              onClick={() => injectResources(500, 1000)}
              style={{ background: 'rgba(234, 88, 12, 0.1)', border: '1px solid var(--accent-energy)', color: 'var(--accent-energy)', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              ВЗЛОМ: +1000 Токенов и +500 XP
            </button>
            <button 
              onClick={() => resetProgress()}
              style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              СБРОС ДАННЫХ
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}