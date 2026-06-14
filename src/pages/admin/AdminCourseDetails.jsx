import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourseStore } from '../../store/courseStore';

export default function AdminCourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, addLesson, updateLesson, deleteLesson, addModule } = useCourseStore();
  const course = courses.find(c => c._id === id);
  
  // Состояния инлайн-редактора
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [addingToModuleId, setAddingToModuleId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = (lesson) => {
    setEditingLessonId(lesson._id);
    setAddingToModuleId(null);
    setFormData({
      title: lesson.title || '',
      type: lesson.type || 'theory',
      theory: lesson.theory || '',
      task: lesson.task || '',
      initialHtml: lesson.initialHtml || '',
      initialCss: lesson.initialCss || '',
      initialJs: lesson.initialJs || ''
    });
  };

  const handleAddClick = (moduleId) => {
    setAddingToModuleId(moduleId);
    setEditingLessonId(null);
    setFormData({
      title: '', type: 'theory', theory: '', task: '', initialHtml: '', initialCss: '', initialJs: ''
    });
  };

  const cancelEdit = () => {
    setEditingLessonId(null);
    setAddingToModuleId(null);
    setFormData({});
  };

  const handleSave = (moduleId) => {
    if (editingLessonId) {
      updateLesson(id, moduleId, editingLessonId, formData);
    } else {
      addLesson(id, moduleId, formData);
    }
    cancelEdit();
  };

  const handleDelete = (moduleId, lessonId) => {
    if (window.confirm('Удалить этот узел из модуля?')) {
      deleteLesson(id, moduleId, lessonId);
    }
  };

  if (!course) return <div style={{ padding: '40px', color: '#ff3333' }}>Вектор не найден.</div>;

  // Компонент Инлайн-формы
  const InlineEditor = ({ moduleId, isNew }) => (
    <div style={{ background: '#1a1a1a', border: '1px solid var(--admin-accent)', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
      <h3 style={{ margin: 0, color: 'var(--admin-accent)', fontSize: '14px', textTransform: 'uppercase' }}>
        {isNew ? 'Создание нового узла' : 'Редактирование узла'}
      </h3>
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <input 
          placeholder="Название узла" 
          value={formData.title} 
          onChange={e => setFormData({...formData, title: e.target.value})}
          style={{ flex: 1, background: '#000', border: '1px solid var(--admin-border)', color: '#fff', padding: '10px', borderRadius: '4px' }}
        />
        <select 
          value={formData.type} 
          onChange={e => setFormData({...formData, type: e.target.value})}
          style={{ 
            appearance: 'none', WebkitAppearance: 'none',
            background: '#000 url("data:image/svg+xml;utf8,<svg fill=\'%23ffffff\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>") no-repeat right 12px center',
            backgroundSize: '16px', border: '1px solid var(--admin-border)', color: '#fff', 
            padding: '10px 36px 10px 16px', borderRadius: '4px', minWidth: '140px', cursor: 'pointer', outline: 'none'
          }}
        >
          <option value="theory">Теория</option>
          <option value="practice">Практика</option>
        </select>
      </div>

      <textarea 
        placeholder="Теоретическая база (Отображается всегда)" 
        value={formData.theory} 
        onChange={e => setFormData({...formData, theory: e.target.value})}
        style={{ width: '100%', minHeight: '80px', background: '#000', border: '1px solid var(--admin-border)', color: '#fff', padding: '10px', borderRadius: '4px', resize: 'vertical' }}
      />

      {formData.type === 'practice' && (
        <textarea 
          placeholder="Инструкция к заданию (Что нужно сделать?)" 
          value={formData.task} 
          onChange={e => setFormData({...formData, task: e.target.value})}
          style={{ width: '100%', minHeight: '60px', background: '#000', border: '1px dashed var(--admin-accent)', color: '#fff', padding: '10px', borderRadius: '4px', resize: 'vertical' }}
        />
      )}

      <div style={{ display: 'flex', gap: '12px' }}>
        <input 
          placeholder="Стартовый HTML (если нужен)" 
          value={formData.initialHtml} 
          onChange={e => setFormData({...formData, initialHtml: e.target.value})}
          style={{ flex: 1, background: '#000', border: '1px solid var(--admin-border)', color: '#fff', padding: '10px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '12px' }}
        />
        <input 
          placeholder="Стартовый CSS" 
          value={formData.initialCss} 
          onChange={e => setFormData({...formData, initialCss: e.target.value})}
          style={{ flex: 1, background: '#000', border: '1px solid var(--admin-border)', color: '#fff', padding: '10px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '12px' }}
        />
        <input 
          placeholder="Стартовый JS" 
          value={formData.initialJs} 
          onChange={e => setFormData({...formData, initialJs: e.target.value})}
          style={{ flex: 1, background: '#000', border: '1px solid var(--admin-border)', color: '#fff', padding: '10px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '12px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button onClick={cancelEdit} style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--admin-border)', color: 'var(--admin-text-main)', borderRadius: '4px', cursor: 'pointer' }}>Отмена</button>
        <button onClick={() => handleSave(moduleId)} style={{ padding: '8px 16px', background: 'var(--admin-accent)', border: 'none', color: '#000', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>Сохранить в БД</button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <button onClick={() => navigate('/admin/courses')} style={{ background: 'transparent', border: 'none', color: 'var(--admin-accent)', cursor: 'pointer', marginBottom: '24px', padding: 0 }}>
        &larr; Назад к векторам
      </button>
      
      <h1 style={{ fontSize: '32px', margin: '0 0 8px 0', color: '#fff', textTransform: 'uppercase' }}>{course.title}</h1>
      <p style={{ color: 'var(--admin-text-muted)', marginBottom: '40px' }}>{course.description}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {course.modules.map((module, mIdx) => (
          <div key={module._id} style={{ background: 'var(--admin-bg-panel)', border: '1px solid var(--admin-border)', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#fff', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--admin-accent)' }}>0{mIdx + 1} //</span> {module.title}
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {module.lessons.map((lesson, lIdx) => (
                <div key={lesson._id}>
                  {editingLessonId === lesson._id ? (
                    <InlineEditor moduleId={module._id} isNew={false} />
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0a0a0a', padding: '16px', borderRadius: '6px', border: '1px solid #222' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ color: 'var(--admin-text-muted)', fontFamily: 'monospace' }}>[{lIdx + 1}]</span>
                        <span style={{ color: '#fff', fontWeight: 'bold' }}>{lesson.title}</span>
                        <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '4px', background: lesson.type === 'theory' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(234, 88, 12, 0.2)', color: lesson.type === 'theory' ? '#3b82f6' : 'var(--admin-accent)', textTransform: 'uppercase' }}>
                          {lesson.type}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={() => handleEditClick(lesson)} style={{ background: 'transparent', border: '1px solid var(--admin-border)', color: 'var(--admin-text-main)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Изменить</button>
                        <button onClick={() => handleDelete(module._id, lesson._id)} style={{ background: 'transparent', border: '1px solid #ff3333', color: '#ff3333', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Удалить</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {addingToModuleId === module._id ? (
                <InlineEditor moduleId={module._id} isNew={true} />
              ) : (
                <button onClick={() => handleAddClick(module._id)} style={{ background: 'transparent', border: '1px dashed var(--admin-border)', color: 'var(--admin-text-muted)', padding: '16px', borderRadius: '6px', cursor: 'pointer', marginTop: '8px', textAlign: 'center', transition: 'all 0.2s' }} onMouseEnter={e => {e.target.style.borderColor = 'var(--admin-accent)'; e.target.style.color = 'var(--admin-accent)';}} onMouseLeave={e => {e.target.style.borderColor = 'var(--admin-border)'; e.target.style.color = 'var(--admin-text-muted)';}}>
                  + Инициализировать новый узел
                </button>
              )}
            </div>
          </div>
        ))}

        <button 
          onClick={() => {
            const title = window.prompt('Введите название нового модуля:');
            if (title) addModule(id, title);
          }} 
          style={{ background: 'rgba(234, 88, 12, 0.05)', border: '1px dashed var(--admin-accent)', color: 'var(--admin-accent)', padding: '20px', borderRadius: '12px', cursor: 'pointer', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', transition: '0.2s', marginTop: '16px' }}
          onMouseEnter={e => e.target.style.background = 'rgba(234, 88, 12, 0.1)'}
          onMouseLeave={e => e.target.style.background = 'rgba(234, 88, 12, 0.05)'}
        >
          + Добавить новый модуль
        </button>

      </div>
    </div>
  );
}