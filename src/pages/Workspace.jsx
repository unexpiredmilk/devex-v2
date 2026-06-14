import { useUIStore } from '../store/uiStore';
import { useState, useRef, useEffect, useMemo } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CaretLeft, CaretRight, TrophyIcon, BugIcon, FileHtml, FileCss, FileJs, Plus, TerminalWindowIcon, ShieldCheck, Sun, Moon } from '@phosphor-icons/react';
import { validateCode } from '../utils/validator';
import { useCourseStore } from '../store/courseStore';

export default function Workspace() {
  const { theme, setTheme, operator, selectedChapter, currentLessonIdx, setChapter, setLesson, unlockAchievement, addReward } = useUIStore();
  const { courses } = useCourseStore();
  const monaco = useMonaco();
  
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('html');
  const [files, setFiles] = useState({ html: '', css: '', js: '' });
  const activeTabRef = useRef(activeTab); 
  useEffect(() => { activeTabRef.current = activeTab; }, [activeTab]);

  const [isTaskPanelOpen, setIsTaskPanelOpen] = useState(true);
  const [logs, setLogs] = useState(['> [DEVEX_SYS] Инициализация окружения...']);
  const [toast, setToast] = useState(null); 
  const [showBoundary, setShowBoundary] = useState(false); 
  
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [activatedImplants, setActivatedImplants] = useState([]);
  
  const [lessonStartTime, setLessonStartTime] = useState(Date.now());
  const [emmetCount, setEmmetCount] = useState(0); 

  const stateRef = useRef({ energy: operator.energy, activated: activatedImplants });
  useEffect(() => { stateRef.current = { energy: operator.energy, activated: activatedImplants }; }, [operator.energy, activatedImplants]);

  const terminalEndRef = useRef(null);
  const unlockedImplants = operator.unlockedImplants || [];

  useEffect(() => { if (terminalEndRef.current) terminalEndRef.current.scrollIntoView({ behavior: 'smooth' }); }, [logs]);
  useEffect(() => { 
    setLessonStartTime(Date.now()); 
    setShowBoundary(false); 
  }, [currentLessonIdx, selectedChapter]);

  // TODO: Локальные курсы будут загружаться здесь

  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme('devex-dark', { base: 'vs-dark', inherit: true, rules: [], colors: { 'editor.background': '#1a1a1a' }});
    monaco.editor.defineTheme('devex-light', { base: 'vs', inherit: true, rules: [], colors: { 'editor.background': '#F5F5F5' }});
  };

  useEffect(() => {
    if (monaco) monaco.editor.setTheme(theme === 'light' ? 'devex-light' : 'devex-dark');
  }, [theme, monaco]);

  const playCyberPing = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine'; osc.frequency.setValueAtTime(880, ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1); 
      gain.gain.setValueAtTime(0.3, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start(); osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  };

  const triggerToast = (id, title, desc) => {
    if (unlockAchievement(id)) {
      playCyberPing();
      setToast({ title, desc });
      setTimeout(() => setToast(null), 5500); 
    }
  };

  const toggleImplant = (id) => {
    if (activatedImplants.includes(id)) {
      setActivatedImplants(prev => prev.filter(i => i !== id));
      setLogs(prev => [...prev, `> [SYS] Модуль отключен.`]);
    } else {
      setActivatedImplants(prev => [...prev, id]);
      setIsHubOpen(false);
      setLogs(prev => [...prev, `> [SYS] Модуль АКТИВЕН.`]);
    }
  };

  const getIconConfig = (iconType) => {
      switch (iconType) {
          case 'FileHtml': return { component: <FileHtml size={48} color="var(--accent-energy)" weight="duotone" />, desc: "Скелет интерфейса. Изучение семантики." };
          case 'FileCss': return { component: <FileCss size={48} color="#264de4" weight="duotone" />, desc: "Каскадные таблицы стилей. Визуальное программирование." };
          case 'FileJs': return { component: <FileJs size={48} color="#f0db4f" weight="duotone" />, desc: "Оживление структур. Алгоритмы и взаимодействие с DOM." };
          default: return { component: <FileHtml size={48} color="var(--accent-energy)" weight="duotone" />, desc: "Обучающий вектор." };
      }
  };

  const activeCourse = useMemo(() => courses.find(c => c._id === selectedChapter), [courses, selectedChapter]);
  
  const flattenedLessons = useMemo(() => {
      if (!activeCourse || !activeCourse.modules) return [];
      let result = [];
      activeCourse.modules.forEach((mod, mIdx) => {
          mod.lessons.forEach((lesson, lIdx) => {
              result.push({
                  ...lesson,
                  moduleId: mod._id,
                  isLastInModule: lIdx === mod.lessons.length - 1,
                  isLastInCourse: mIdx === activeCourse.modules.length - 1 && lIdx === mod.lessons.length - 1
              });
          });
      });
      return result;
  }, [activeCourse]);

  const activeLesson = flattenedLessons[currentLessonIdx];

  const handleRun = () => {
    if (!activeLesson) return;
    const fullCode = (files.html + files.css + files.js).toLowerCase();
    setLogs(prev => [...prev, `> Сборка модулей...`]);
    
    if (fullCode.includes('// secret_key')) triggerToast('ghost', 'Призрак в системе', 'Скрытый код обнаружен.');

    if (activeLesson.type === 'practice') {
      const validation = validateCode(activeLesson.title, fullCode);
      
      if (validation.isValid) { 
        setLogs(prev => [...prev, `> <span style="color: var(--accent-energy)">УСПЕШНО</span>. Алгоритм верен.`]);
        triggerToast('clean', 'Чистая компиляция', 'Сдано без ошибок синтаксиса.');
        
        // ---- ВЫДАЕМ НАГРАДУ ----
        addReward(25, 5); 

      } else {
        setLogs(prev => [...prev, `> <span style="color: #ff3333">[ОШИБКА]</span> ${validation.error}`]);
      }
    } else {
      setLogs(prev => [...prev, `> Свободная компиляция.`]);
    }
  };
  const handleNext = () => {
    if (activeLesson.type === 'theory') {
      useUIStore.getState().addEnergy(1);
    }

    if (activeLesson.isLastInCourse) {
      setShowBoundary('course');
    } else if (activeLesson.isLastInModule) {
      setShowBoundary('module');
    } else {
      setLesson(currentLessonIdx + 1);
    }
  };

  const handleEditorMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyCode.Tab, () => {
      const { energy, activated } = stateRef.current;
      const position = editor.getPosition();
      const lineContent = editor.getModel().getLineContent(position.lineNumber);
      const textBeforeCursor = lineContent.substring(0, position.column - 1).trim();

      if (textBeforeCursor === '!' && activated.includes('emmet') && activeTabRef.current === 'html') {
        if (energy >= 1) {
          useUIStore.getState().useEnergy(1);
          setEmmetCount(prev => prev + 1);
          const boilerplate = `<!DOCTYPE html>\n<html lang="ru">\n<head>\n    <meta charset="UTF-8">\n    <title>DEVEX</title>\n</head>\n<body>\n    \n</body>\n</html>`;
          editor.executeEdits("emmet", [{ range: new monaco.Range(position.lineNumber, lineContent.indexOf('!') + 1, position.lineNumber, position.column), text: boilerplate, forceMoveMarkers: true }]);
          editor.setPosition({ lineNumber: 8, column: 5 });
          setLogs(prev => [...prev, `> [IMPLANT] Emmet: Развернуто. <span style="color:var(--accent-energy)">-1 АКБ</span>.`]);
        } else {
          setLogs(prev => [...prev, `> <span style="color:#ff3333">[ERR] Низкий заряд АКБ!</span>`]);
        }
      } else {
        editor.trigger('keyboard', 'type', { text: '\t' });
      }
    }, 'editorTextFocus');
  };

  const handleEditorChange = (value) => setFiles(prev => ({ ...prev, [activeTab]: value || '' }));

  useEffect(() => {
      if (activeLesson) {
          setFiles({
              html: activeLesson.initialHtml || '',
              css: activeLesson.initialCss || '',
              js: activeLesson.initialJs || ''
          });
          setActiveTab('html');
      }
  }, [activeLesson]);

  const injectedCode = `
    <style>
      html, body { 
        background: transparent !important; 
        color: ${theme === 'light' ? '#111111' : '#e0e0e0'};
        font-family: system-ui, -apple-system, sans-serif;
        margin: 0;
        padding: 16px;
        box-sizing: border-box;
      }
      ${files.css}
    </style>
    ${files.html}
    <script>
      try { ${files.js} } catch(e) { console.error(e); }
    </script>
  `;

  if (isLoading) return <div style={{ flex: 1, padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h1 style={{ fontFamily: 'var(--font-tech)', fontSize: '20px', color: 'var(--text-muted)' }}>Синхронизация...</h1></div>;

  if (!selectedChapter) {
    return (
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <h1 style={{ fontFamily: 'var(--font-tech)', fontSize: '28px', color: 'var(--text-main)', marginBottom: '32px' }}>ВЫБЕРИТЕ ВЕКТОР ОБУЧЕНИЯ</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {courses.map((course) => {
            const config = getIconConfig(course.iconType);
            return (
              <motion.div key={course._id} whileHover={{ y: -5, borderColor: 'var(--accent-energy)' }} onClick={() => setChapter(course._id)} className="dashboard-card" style={{ cursor: 'pointer', textAlign: 'center', padding: '40px 24px' }}>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{config.component}</div>
                <h2 style={{ fontSize: '20px', color: 'var(--text-main)', marginBottom: '12px', textTransform: 'uppercase' }}>{course.title}</h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{course.description || config.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  if (!activeCourse || flattenedLessons.length === 0 || !activeLesson) return <div style={{ flex: 1, padding: '40px' }}>Ошибка: Данные вектора пусты.</div>;

  const isTheory = activeLesson.type === 'theory';

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', minWidth: 0, padding: '8px', gap: '8px', position: 'relative' }}>
      
      {/* --- ЭКРАН ПЕРЕХОДА (OVERLAY) --- */}
      <AnimatePresence>
        {showBoundary && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: theme === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(10, 10, 10, 0.85)',
              zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              borderRadius: '8px', border: '1px solid var(--accent-energy)'
            }}
          >
            <ShieldCheck size={80} color="var(--accent-energy)" weight="duotone" style={{ marginBottom: '24px' }} />
            <h1 style={{ fontFamily: 'var(--font-tech)', fontSize: '42px', color: 'var(--text-main)', textTransform: 'uppercase', marginBottom: '16px' }}>
              {showBoundary === 'course' ? 'ВЕКТОР СИНТЕЗИРОВАН' : 'МОДУЛЬ УСВОЕН'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '500px', textAlign: 'center', marginBottom: '40px', lineHeight: '1.5' }}>
              {showBoundary === 'course' 
                ? 'Вы успешно завершили все модули данного направления. Полученные навыки сохранены в базе данных оператора.'
                : 'Блок данных успешно записан в память. Восстановлен 1 заряд АКБ. Готовы приступить к следующему этапу?'}
            </p>
            
            <div style={{ display: 'flex', gap: '20px' }}>
              <button 
                onClick={() => { setShowBoundary(false); setChapter(null); setLesson(0); }}
                style={{ padding: '14px 28px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)', fontSize: '14px', cursor: 'pointer', fontFamily: 'var(--font-tech)', borderRadius: '6px' }}
              >
                &larr; В ХАБ
              </button>
              
              {showBoundary === 'module' && (
                <button 
                  onClick={() => { setShowBoundary(false); setLesson(currentLessonIdx + 1); }}
                  style={{ padding: '14px 28px', background: 'var(--accent-energy)', border: 'none', color: '#000', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-tech)', borderRadius: '6px', boxShadow: '0 0 15px rgba(234, 88, 12, 0.3)' }}
                >
                  СЛЕДУЮЩИЙ МОДУЛЬ &rarr;
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="workspace" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0, height: '100%' }}>
        
        <div className="panel editor-container" style={{ flex: 3, display: 'flex', flexDirection: 'column', minHeight: '250px', resize: 'none' }}>
          <div className="tabs">
            <div className="tab-group">
              <div className="tab" onClick={() => { setChapter(null); setLesson(0); }} style={{ color: 'var(--text-main)', borderRight: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}><CaretLeft /> В ХАБ</div>
              <div className={`tab ${activeTab === 'html' ? 'active' : ''}`} onClick={() => setActiveTab('html')} style={{ cursor: 'pointer' }}>index.html</div>
              <div className={`tab ${activeTab === 'css' ? 'active' : ''}`} onClick={() => setActiveTab('css')} style={{ cursor: 'pointer' }}>style.css</div>
              <div className={`tab ${activeTab === 'js' ? 'active' : ''}`} onClick={() => setActiveTab('js')} style={{ cursor: 'pointer' }}>script.js</div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button className="play-btn" onClick={handleRun} disabled={isTheory} style={{ opacity: isTheory ? 0.4 : 1, cursor: isTheory ? 'not-allowed' : 'pointer' }}>
                <Play weight="fill" size={14} /> ЗАПУСК
              </button>
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'hidden', paddingTop: '8px' }}>
            <Editor 
              height="100%" 
              language={activeTab === 'js' ? 'javascript' : activeTab} 
              theme={theme === 'light' ? 'devex-light' : 'devex-dark'} 
              value={files[activeTab]} 
              onChange={handleEditorChange} 
              beforeMount={handleEditorWillMount} 
              onMount={handleEditorMount} 
              options={{ minimap: { enabled: false }, fontSize: 16, fontFamily: "'BetterVCR', monospace", readOnly: isTheory }} 
            />
          </div>
        </div>

        <div style={{ flex: 2, display: 'flex', gap: '8px', minHeight: '200px', alignItems: 'stretch' }}>
          <div className="panel terminal-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', margin: 0, padding: 0, overflow: 'hidden', height: '100%', resize: 'none' }}>
            <div className="header-tech" style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', margin: 0 }}>
              <span>ТЕРМИНАЛ // ВЫВОД</span>
            </div>
            <div className="terminal-output" style={{ flex: 1, overflowY: 'auto', padding: '16px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {logs.map((l, i) => <div key={i} dangerouslySetInnerHTML={{ __html: l }} />)}
              <div ref={terminalEndRef} />
            </div>
          </div>

          <div className="panel preview-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', margin: 0, padding: 0, overflow: 'hidden', height: '100%', resize: 'none', background: theme === 'light' ? '#ffffff' : '#1a1a1a' }}>
            <div className="header-tech" style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', margin: 0 }}>
              <span>ВИЗУАЛИЗАЦИЯ // DOM</span>
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              <iframe 
                srcDoc={injectedCode} 
                title="Live Preview" 
                sandbox="allow-scripts" 
                style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', top: 0, left: 0, backgroundColor: 'transparent' }} 
              />
            </div>
          </div>
        </div>
      </section>

      <div onClick={() => setIsTaskPanelOpen(!isTaskPanelOpen)} className="panel" style={{ width: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', flexShrink: 0 }}>
        {isTaskPanelOpen ? <CaretRight size={20} /> : <CaretLeft size={20} />}
      </div>

      <motion.div 
        initial={false} 
        animate={{ width: isTaskPanelOpen ? 420 : 0, opacity: isTaskPanelOpen ? 1 : 0 }} 
        transition={{ duration: 0.3 }} 
        style={{ overflow: 'hidden', flexShrink: 0, minWidth: 0 }}
      >
        <main className="panel theory-module" style={{ width: '420px', height: '100%', padding: 0, display: 'flex', flexDirection: 'column' }}>
          
          <div className="header-tech" style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', margin: 0, flexShrink: 0 }}>
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{activeCourse.title}</span>
            <span style={{ flexShrink: 0 }}>{currentLessonIdx + 1} / {flattenedLessons.length}</span>
          </div>
          
          <div className="theory-content" style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 12px 24px' }}>
            <h1 style={{ color: 'var(--text-main)', marginBottom: '12px', fontFamily: 'var(--font-display)', fontSize: '20px' }}>{activeLesson.title}</h1>
            
            <div style={{ lineHeight: '1.5', color: 'var(--text-main)', fontSize: '14px', marginBottom: '16px', whiteSpace: 'pre-wrap' }}>
              {activeLesson.theory}
            </div>

            {!isTheory && activeLesson.task && (
              <div className="task-box" style={{ padding: '16px', marginTop: 0, background: 'rgba(234, 88, 12, 0.05)', border: '1px dashed var(--accent-energy)', borderRadius: '6px' }}>
                <b style={{ color: 'var(--accent-energy)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>ЗАДАНИЕ ТЕРМИНАЛА:</b>
                 <div style={{ color: 'var(--text-main)', fontSize: '13px', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                   {activeLesson.task}
                 </div>
              </div>
            )}
          </div>

          <div style={{ background: 'var(--bg-panel)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', borderTop: '1px solid var(--border-color)', borderBottom: isTheory ? 'none' : '1px solid var(--border-color)' }}>
                <button onClick={() => setLesson(currentLessonIdx - 1)} disabled={currentLessonIdx === 0} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: currentLessonIdx === 0 ? 'var(--border-color)' : 'var(--text-main)', padding: '6px 14px', borderRadius: '6px', cursor: currentLessonIdx === 0 ? 'not-allowed' : 'pointer', fontSize: '13px' }}>&larr; Назад</button>
                <button onClick={handleNext} style={{ background: 'rgba(234, 88, 12, 0.1)', border: '1px solid var(--accent-energy)', color: 'var(--accent-energy)', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>Далее &rarr;</button>
             </div>
             
             {!isTheory && (
               <div className="hub-wrapper" style={{ padding: '16px 24px' }}>
                  <div className="implant-hint" style={{ marginBottom: '10px' }}>// МОДУЛИ АКТИВАЦИИ</div>
                  <div className={`implants-hub ${isHubOpen ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '46px' }}>
                      <div style={{ position: 'relative', width: '46px', height: '46px', flexShrink: 0 }}>
                          <button className={`implant-trigger ${isHubOpen ? 'active' : ''}`} onClick={() => setIsHubOpen(!isHubOpen)} style={{ width: '46px', height: '46px' }}><Plus weight="bold" /></button>
                          {unlockedImplants.includes('emmet') && <div className="implant-node" onClick={() => toggleImplant('emmet')}><TerminalWindowIcon weight="duotone" /></div>}
                          {unlockedImplants.includes('locator') && <div className="implant-node" onClick={() => toggleImplant('locator')}><BugIcon weight="duotone" /></div>}
                      </div>
                      <div className="status-right" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
                          <div className="selected-implants" style={{ display: 'flex', gap: '8px' }}>
                              {activatedImplants.includes('emmet') && <TerminalWindowIcon className="implant-activated" />}
                              {activatedImplants.includes('locator') && <BugIcon className="implant-activated" />}
                          </div>
                          <div className="battery-pack">
                             {[...Array(3)].map((_, i) => <div key={i} className={`battery-cell ${i < operator.energy ? 'filled' : ''}`} />)}
                          </div>
                      </div>
                  </div>
               </div>
             )}
          </div>
        </main>
      </motion.div>

      <AnimatePresence>
        {toast && (
          <motion.div 
            className="cyber-toast"
            initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} 
            style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '16px' }}
          >
            <TrophyIcon size={36} color="var(--accent-energy)" weight="duotone" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontFamily: 'var(--font-tech)', fontSize: '11px', color: 'var(--accent-energy)' }}>ДОСТИЖЕНИЕ РАЗБЛОКИРОВАНО</span>
              <span className="toast-text-main" style={{ fontSize: '15px', fontWeight: 'bold' }}>{toast.title}</span>
              <span className="toast-text-muted" style={{ fontSize: '12px' }}>{toast.desc}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}