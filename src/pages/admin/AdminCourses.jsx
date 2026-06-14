import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash, FileHtml, FileCss, FileJs, DotsThree, X } from '@phosphor-icons/react';
import { useCourseStore } from '../../store/courseStore';

export default function AdminCourses() {
  const { courses, deleteCourse } = useCourseStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  
  // Инициализируем навигацию
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm('Удалить этот вектор? Действие необратимо.')) {
      deleteCourse(id);
    }
  };

  const openCreateModal = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const iconMap = {
    FileHtml: <FileHtml size={32} color="var(--admin-accent)" weight="duotone" />,
    FileCss: <FileCss size={32} color="#264de4" weight="duotone" />,
    FileJs: <FileJs size={32} color="#f0db4f" weight="duotone" />
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', gap: '32px', paddingBottom: '16px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '8px', color: 'var(--admin-text-main)' }}>
            Контент & Уроки
          </h1>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '14px' }}>
            Проектирование архитектуры обучающих векторов в базе данных.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openCreateModal}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            backgroundColor: 'var(--admin-accent)', color: '#fff', 
            padding: '12px 24px', borderRadius: '12px', 
            border: 'none', fontWeight: '700', cursor: 'pointer'
          }}
        >
          <Plus weight="bold" size={18} />
          Создать вектор
        </motion.button>
      </div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}
        >
          {courses.map(course => (
            <motion.div 
              key={course._id} 
              // ПЕРЕХОД ВНУТРЬ ВЕКТОРА ПО КЛИКУ НА КАРТОЧКУ
              onClick={() => navigate(`/admin/courses/${course._id}`)}
              style={{
                backgroundColor: 'var(--admin-bg-base)', border: '1px solid var(--admin-border)',
                borderRadius: '18px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px',
                transition: 'border-color 0.2s', cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'var(--admin-bg-panel)', padding: '12px', borderRadius: '14px', border: '1px solid var(--admin-border)' }}>
                  {iconMap[course.iconType] || <FileHtml size={32} />}
                </div>
                <button style={{ background: 'transparent', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer' }}>
                  <DotsThree size={28} weight="bold" />
                </button>
              </div>

              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--admin-text-main)', marginBottom: '4px' }}>
                  {course.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--admin-accent)' }}></div>
                  <p style={{ color: 'var(--admin-text-muted)', fontSize: '13px' }}>ID: {course.courseId} • {course.lessonsCount} уроков</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', borderTop: '1px dashed var(--admin-border)', paddingTop: '16px', marginTop: 'auto' }}>
                <button 
                  // STOP PROPAGATION: Чтобы при клике на "Редактировать" нас не перекидывало внутрь вектора
                  onClick={(e) => { e.stopPropagation(); openEditModal(course); }}
                  style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg-panel)', color: 'var(--admin-text-main)', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
                >
                  Редактировать
                </button>
                <button 
                  // STOP PROPAGATION: Чтобы при клике на "Удалить" нас не перекидывало внутрь вектора
                  onClick={(e) => { e.stopPropagation(); handleDelete(course._id); }}
                  style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.05)', color: '#ef4444', cursor: 'pointer' }}
                >
                  <Trash size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <CourseModal 
            initialData={editingCourse}
            onClose={() => setIsModalOpen(false)} 
            onSuccess={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function CourseModal({ initialData, onClose, onSuccess }) {
  const isEditMode = !!initialData;
  const { addCourse, updateCourse } = useCourseStore();
  const [formData, setFormData] = useState(
    initialData || { courseId: '', title: '', iconType: 'FileHtml' }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      updateCourse(initialData._id, formData);
    } else {
      addCourse(formData);
    }
    onSuccess();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        style={{ backgroundColor: 'var(--admin-bg-panel)', border: '1px solid var(--admin-border)', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '400px', margin: 'auto' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ fontWeight: '800', color: 'var(--admin-text-main)' }}>
            {isEditMode ? 'Редактировать вектор' : 'Новый вектор'}
          </h2>
          <X size={24} cursor="pointer" color="var(--admin-text-muted)" onClick={onClose} />
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            placeholder="ID (например: react-core)" 
            required
            value={formData.courseId}
            onChange={e => setFormData({...formData, courseId: e.target.value})}
            disabled={isEditMode} 
            style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg-base)', color: 'var(--admin-text-main)' }}
          />
          <input 
            placeholder="Название вектора" 
            required
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg-base)', color: 'var(--admin-text-main)' }}
          />
          <select 
            value={formData.iconType}
            onChange={e => setFormData({...formData, iconType: e.target.value})}
            style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg-base)', color: 'var(--admin-text-main)' }}
          >
            <option value="FileHtml" style={{ background: '#12100e', color: '#fff' }}>HTML Icon</option>
            <option value="FileCss" style={{ background: '#12100e', color: '#fff' }}>CSS Icon</option>
            <option value="FileJs" style={{ background: '#12100e', color: '#fff' }}>JS Icon</option>
          </select>
          <button type="submit" style={{ backgroundColor: 'var(--admin-accent)', color: '#fff', padding: '14px', borderRadius: '12px', border: 'none', fontWeight: '700', marginTop: '10px', cursor: 'pointer' }}>
            {isEditMode ? 'Сохранить изменения' : 'Инициализировать в БД'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}