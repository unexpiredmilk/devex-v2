import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../store/uiStore';
import { motion } from 'framer-motion';

const PLASMA_CHARS = '░▒▓▄▀■□▪◆◇●○╬╫╩╦╣╠║═╔╗╚╝';

function AsciiPlasma() {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const draw = () => {
      tRef.current += 0.038;
      const t = tRef.current;
      const CW = 10, CH = 13;
      const cols = Math.ceil(window.innerWidth / CW);
      const rows = Math.ceil(window.innerHeight / CH);
      const cx = cols / 2, cy = rows / 2;
      let out = '';
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v =
            Math.sin(x * 0.13 + t) +
            Math.sin(y * 0.11 + t * 0.85) +
            Math.sin((x + y) * 0.09 + t * 1.1) +
            Math.sin(Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) * 0.13 - t * 1.05);
          const n = (v + 4) / 8;
          out += PLASMA_CHARS[Math.floor(n * (PLASMA_CHARS.length - 1))];
        }
        out += '\n';
      }
      el.textContent = out;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <pre ref={ref} style={{
      position: 'fixed', inset: 0,
      fontFamily: 'Courier New, monospace',
      fontSize: '14px', lineHeight: '1.18',
      letterSpacing: '3px',
      color: 'var(--accent-energy)',
      opacity: 0.28,
      whiteSpace: 'pre',
      overflow: 'hidden',
      pointerEvents: 'none',
      willChange: 'contents',
    }} />
  );
}

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(
      [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()]
        .map(n => String(n).padStart(2, '0')).join(':')
    );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const BOOT_LINES = [
  '> СИСТЕМА ИНИЦИАЛИЗИРОВАНА.',
  '> ОБНАРУЖЕНО НЕАВТОРИЗОВАННОЕ ПОДКЛЮЧЕНИЕ.',
  '> ОЖИДАНИЕ ВВОДА НИКНЕЙМА ДЛЯ СОЗДАНИЯ СЕССИИ...',
];

export default function Login() {
  const [input, setInput] = useState('');
  const [visibleLines, setVisibleLines] = useState(0);
  const { login } = useUIStore();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const time = useClock();
  const isReady = input.trim().length >= 3;

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= BOOT_LINES.length) {
        clearInterval(id);
        setTimeout(() => inputRef.current?.focus(), 300);
      }
    }, 750);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isReady) {
      login(input.trim().toUpperCase());
      navigate('/');
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      backgroundColor: '#050505',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', overflow: 'hidden',
    }}>
      <AsciiPlasma />

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        style={{
          width: '100%', maxWidth: '600px',
          border: '1px solid rgba(217,91,0,0.25)',
          backgroundColor: 'rgba(8,8,8,0.94)',
          borderRadius: '8px', overflow: 'hidden',
          boxShadow: '0 0 60px rgba(217,91,0,0.1)',
          backdropFilter: 'blur(4px)',
          position: 'relative', zIndex: 2,
        }}
      >
        {/* ── HEADER ─────────────────────────────── */}
        <div style={{
          padding: '8px 16px',
          borderBottom: '1px solid rgba(217,91,0,0.15)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--font-tech)',   // BetterVCR
          fontSize: '11px',
          color: 'rgba(217,91,0,0.5)',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[true, false, false].map((on, i) => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: '50%',
                background: on ? 'var(--accent-energy)' : 'rgba(217,91,0,0.2)',
                boxShadow: on ? '0 0 8px var(--accent-energy)' : 'none',
              }} />
            ))}
          </div>
          <span>TERMINAL // DEV_EX</span>
          {/* Doto для часов — цифровой индикатор */}
          <span style={{ fontFamily: 'var(--font-icon)', fontSize: '14px', color: 'var(--accent-energy)', letterSpacing: '2px' }}>
            {time}
          </span>
        </div>

        {/* ── BODY ───────────────────────────────── */}
        <div style={{ padding: '28px 32px 22px' }}>
          {/* Boot lines — BetterVCR */}
          <div style={{ marginBottom: '24px', fontFamily: 'var(--font-tech)', fontSize: '13px', lineHeight: '1.9', minHeight: '78px', letterSpacing: '0.5px' }}>
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{ color: 'rgba(217,91,0,0.75)' }}
              >
                <span style={{ color: 'rgba(217,91,0,0.35)' }}>&gt; </span>
                {line.slice(2)}
              </motion.p>
            ))}
          </div>

          {/* Input — BetterVCR для текста, Helvetica Neue для placeholder */}
          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              borderTop: '1px solid rgba(217,91,0,0.1)',
              paddingTop: '18px',
            }}>
              <span style={{ fontFamily: 'var(--font-tech)', color: 'var(--accent-energy)', fontSize: '17px' }}>$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Введите имя оператора"
                spellCheck="false"
                autoComplete="off"
                style={{
                  background: 'transparent', border: 'none', outline: 'none',
                  color: 'var(--accent-energy)',
                  fontFamily: 'var(--font-tech)',   // BetterVCR — то, что печатает оператор
                  fontSize: '17px', flex: 1,
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  caretColor: 'transparent',
                  // Placeholder через CSS-класс (см. ниже)
                }}
                className="login-input"
              />
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1, ease: 'steps(1)' }}
                style={{ width: 10, height: 19, background: 'var(--accent-energy)', flexShrink: 0 }}
              />
            </div>
          </form>
        </div>

        {/* ── FOOTER ─────────────────────────────── */}
        <div style={{
          padding: '7px 16px',
          borderTop: '1px solid rgba(217,91,0,0.1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--font-tech)',
          fontSize: '10px',
          color: 'rgba(217,91,0,0.3)',
          letterSpacing: '1px',
        }}>
          <span>SYS.REQ.AUTH // SESSION: NULL</span>
          {/* Doto — короткий статус-индикатор */}
          <motion.span
            animate={{ opacity: isReady ? [0.8, 1, 0.8] : [0.25, 0.55, 0.25] }}
            transition={{ repeat: Infinity, duration: isReady ? 1 : 2.5 }}
            style={{
              fontFamily: 'var(--font-icon)',   // Doto
              fontSize: '12px',
              color: isReady ? 'var(--accent-energy)' : undefined,
              letterSpacing: '2px',
            }}
          >
            ENTER TO AUTH
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}