import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/workspace'); 
  };

  return (
    <div style={styles.container}>
      
      {/* ЛЕВАЯ ЧАСТЬ: ФОРМА */}
      <motion.div 
        className="cyber-panel" 
        style={styles.formPanel}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={styles.header}>
          <i className="ph ph-hexagon" style={{ fontSize: '32px', color: 'var(--accent-energy)' }}></i>
          <span style={{ fontFamily: 'var(--font-tech)', fontSize: '24px' }}>DEVEX</span>
        </div>

        <div style={styles.toggleContainer}>
          <button 
            style={isLogin ? { ...styles.toggleBtn, ...styles.toggleActive } : styles.toggleBtn}
            onClick={() => setIsLogin(true)}
          >
            ВХОД
          </button>
          <button 
            style={!isLogin ? { ...styles.toggleBtn, ...styles.toggleActive } : styles.toggleBtn}
            onClick={() => setIsLogin(false)}
          >
            РЕГИСТРАЦИЯ
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>НИКНЕЙМ</label>
              <input type="text" style={styles.input} placeholder="Например: Kirs" required />
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>EMAIL</label>
            <input type="email" style={styles.input} placeholder="kirs@example.com" required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>ПАРОЛЬ</label>
            <input type="password" style={styles.input} placeholder="••••••••" required />
          </div>

          <button type="submit" style={styles.submitBtn}>
            {isLogin ? 'ВОЙТИ В СИСТЕМУ' : 'СОЗДАТЬ АККАУНТ'}
          </button>
        </form>
      </motion.div>

      {/* ПРАВАЯ ЧАСТЬ: ВИЗУАЛИЗАЦИЯ */}
      <div className="cyber-panel" style={styles.visualPanel}>
        <motion.div 
          style={styles.gridOverlay}
          animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={styles.visualContent}
        >
          <div style={{ fontFamily: 'var(--font-tech)', fontSize: '120px', color: 'var(--accent-energy)', opacity: 0.2, lineHeight: 1 }}>
            {`{ }`}
          </div>
          <h1 style={{ fontFamily: 'var(--font-tech)', fontSize: '36px', marginTop: '20px' }}>
            ИНТЕРАКТИВНЫЙ ПРАКТИКУМ
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '16px', maxWidth: '400px', lineHeight: 1.6, marginInline: 'auto' }}>
            Среда для отработки навыков веб-разработки. Авторизуйтесь, чтобы получить доступ к модулям, редактору кода и статистике.
          </p>
        </motion.div>
      </div>

    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    gap: '12px',
  },
  formPanel: {
    flex: '0 0 450px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  visualPanel: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--bg-element)',
    overflow: 'hidden'
  },
  gridOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
    opacity: 0.1,
  },
  visualContent: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '40px'
  },
  toggleContainer: {
    display: 'flex',
    borderBottom: '1px solid var(--border-color)',
    marginBottom: '32px'
  },
  toggleBtn: {
    flex: 1,
    background: 'none',
    border: 'none',
    padding: '12px 0',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-tech)',
    fontSize: '14px',
    cursor: 'pointer',
    transition: '0.2s'
  },
  toggleActive: {
    color: 'var(--accent-energy)',
    borderBottom: '2px solid var(--accent-energy)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontFamily: 'var(--font-tech)',
    fontSize: '12px',
    color: 'var(--text-muted)',
    letterSpacing: '1px'
  },
  input: {
    backgroundColor: 'var(--bg-element)',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    padding: '12px 16px',
    color: 'var(--text-main)',
    fontFamily: 'var(--font-ui)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  submitBtn: {
    marginTop: '16px',
    backgroundColor: 'var(--accent-energy)',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    padding: '16px',
    fontFamily: 'var(--font-tech)',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'opacity 0.2s'
  }
};