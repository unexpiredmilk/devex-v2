import { useState } from 'react';
import { ShieldWarning, Key, Eye, EyeSlash } from '@phosphor-icons/react';

export default function AdminGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState(false);

  if (isAuthenticated) return children;

  const handleVerify = (e) => {
    e.preventDefault();
    if (pin === '2026') {
      setIsAuthenticated(true);
    } else {
      setError(true);
      setPin('');
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#0a0a0a', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
      <div style={{ background: '#111111', border: `1px solid ${error ? '#ff3333' : 'var(--accent-energy)'}`, borderRadius: '12px', padding: '40px', width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: error ? '0 0 30px rgba(255,51,51,0.2)' : '0 0 40px rgba(234, 88, 12, 0.15)', transition: 'all 0.3s' }}>
        <ShieldWarning size={56} color={error ? "#ff3333" : "var(--accent-energy)"} weight="duotone" style={{ marginBottom: '16px' }} />
        
        <h2 style={{ fontFamily: 'var(--font-tech)', fontSize: '22px', color: 'var(--text-main)', margin: '0 0 8px 0', letterSpacing: '1px' }}>SECURE OVERRIDE</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', margin: '0 0 28px 0' }}>Введите root-ключ протокола безопасности</p>

        <form onSubmit={handleVerify} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Key size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '16px' }} />
            <input 
              type="password" 
              placeholder="••••" 
              value={pin}
              onChange={e => setPin(e.target.value)}
              autoFocus
              style={{ width: '100%', padding: '14px 14px 14px 48px', background: '#000', border: `1px solid ${error ? '#ff3333' : '#333'}`, borderRadius: '8px', color: error ? '#ff3333' : '#00ff00', fontFamily: 'monospace', fontSize: '20px', letterSpacing: '8px', outline: 'none', transition: 'border 0.2s' }}
            />
          </div>

          <button type="submit" style={{ width: '100%', padding: '14px', background: error ? '#ff3333' : 'var(--accent-energy)', border: 'none', borderRadius: '8px', color: error ? '#fff' : '#000', fontFamily: 'var(--font-tech)', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {error ? 'ОТКАЗ ДОСТУПА' : 'АВТОРИЗАЦИЯ'}
          </button>
        </form>

        {/* Интерактивный спойлер */}
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <button 
            type="button"
            onClick={() => setShowHint(!showHint)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
          >
            {showHint ? <EyeSlash size={14} /> : <Eye size={14} />}
            <span>{showHint ? 'Скрыть декодер' : 'Запросить декодер'}</span>
          </button>
          
          {showHint && (
            <div style={{ background: '#1a1a1a', border: '1px dashed #555', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontFamily: 'monospace', color: '#888' }}>
              // Ключ: <span style={{ color: '#fff', fontWeight: 'bold' }}>2026</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
