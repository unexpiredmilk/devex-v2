import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultCourses = [
  {
    _id: 'html-core',
    courseId: 'html-core',
    title: 'HTML Фундамент',
    iconType: 'FileHtml',
    lessonsCount: 6,
    description: 'Семантическое проектирование интерфейсов. Структура данных и базовая разметка.',
    modules: [
      {
        _id: 'm-html-1',
        title: 'Базовые структуры',
        lessons: [
          { 
            _id: 'l-h-1', 
            title: 'Теория: Каркас документа', 
            type: 'theory', 
            theory: 'HTML — это скелет любого веб-терминала.\n\nБраузеру нужно понимать, что перед ним, поэтому документ начинается с <!DOCTYPE html>.\nСам контент делится на две зоны внутри тега <html>:\n1. <head> — метаданные, скрытые от глаз (кодировка, подключение стилей).\n2. <body> — визуальная оболочка, с которой взаимодействует оператор.' 
          },
          { 
            _id: 'l-h-2', 
            title: 'Практика: Инициализация', 
            type: 'practice', 
            theory: 'Для вывода главных сообщений системы используются заголовки от <h1> до <h6>. Для обычного текста — абзацы <p>.', 
            task: 'Внутри тега <body> создайте:\n1. Заголовок h1 с текстом "DEVEX Terminal"\n2. Абзац p с текстом "Ожидание ввода данных..."', 
            initialHtml: '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="UTF-8">\n  <title>Терминал</title>\n</head>\n<body>\n  \n  \n</body>\n</html>' 
          }
        ]
      },
      {
        _id: 'm-html-2',
        title: 'Сбор данных (Формы)',
        lessons: [
          { 
            _id: 'l-h-3', 
            title: 'Теория: Тег form и input', 
            type: 'theory', 
            theory: 'Для получения данных от пользователя используется тег <form>.\n\nВнутри формы располагаются поля ввода — <input>. У поля <input> нет закрывающего тега, но есть важный атрибут type.\nНапример:\n<input type="text"> — для обычного текста\n<input type="password"> — для скрытого пароля.' 
          },
          { 
            _id: 'l-h-4', 
            title: 'Практика: Шлюз авторизации', 
            type: 'practice', 
            theory: 'Атрибут placeholder подсказывает пользователю, что именно нужно ввести.', 
            task: 'Создайте тег form. Внутри него добавьте поле input с типом "text" и плейсхолдером "Введите позывной". Ниже добавьте кнопку button с текстом "Войти".', 
            initialHtml: '<body>\n  <h2>Шлюз доступа</h2>\n  \n  \n</body>' 
          }
        ]
      }
    ]
  },
  {
    _id: 'css-core',
    courseId: 'css-core',
    title: 'CSS Аугментация',
    iconType: 'FileCss',
    lessonsCount: 6,
    description: 'Каскадные таблицы стилей. Визуальное программирование и компоновка.',
    modules: [
      {
        _id: 'm-css-1',
        title: 'Селекторы и визуализация',
        lessons: [
          { 
            _id: 'l-c-1', 
            title: 'Теория: Управление стилем', 
            type: 'theory', 
            theory: 'CSS (Cascading Style Sheets) управляет внешним видом HTML-каркаса.\n\nМы обращаемся к элементам через селекторы:\n- По тегу: button { color: red; }\n- По классу (самый частый способ, начинается с точки): .panel { background: black; }\n\nСвойство color меняет цвет текста, а background-color — цвет фона.' 
          },
          { 
            _id: 'l-c-2', 
            title: 'Практика: Кибер-кнопка', 
            type: 'practice', 
            theory: 'HTML-структура уже готова. Переключитесь на вкладку style.css.', 
            task: 'Обратитесь к классу .cyber-btn. Задайте ему цвет текста (color) #00ff00 и цвет фона (background-color) #111111.', 
            initialHtml: '<body>\n  <div class="interface">\n    <button class="cyber-btn">ВЗЛОМ СИСТЕМЫ</button>\n  </div>\n</body>',
            initialCss: '/* Ваш CSS код ниже */\n\n' 
          }
        ]
      },
      {
        _id: 'm-css-2',
        title: 'Архитектура Flexbox',
        lessons: [
          { 
            _id: 'l-c-3', 
            title: 'Теория: Гибкие сетки', 
            type: 'theory', 
            theory: 'Flexbox — это современный способ расстановки элементов. \n\nЗадав контейнеру display: flex;, выстраиваем элементы в ряд.\nСвойство justify-content управляет ими по горизонтали (например, center или space-between),\nа align-items — по вертикали.' 
          },
          { 
            _id: 'l-c-4', 
            title: 'Практика: Выравнивание панели', 
            type: 'practice', 
            theory: 'У нас есть панель с тремя модулями. Сейчас они слиплись в левом углу.', 
            task: 'Для класса .dashboard-panel задайте display: flex; и раздвиньте элементы по краям с помощью justify-content: space-between;.', 
            initialHtml: '<div class="dashboard-panel">\n  <div class="module">АКБ</div>\n  <div class="module">СЕТЬ</div>\n  <div class="module">ЛОГИ</div>\n</div>',
            initialCss: '.module {\n  background: #333;\n  padding: 10px;\n  color: white;\n}\n\n.dashboard-panel {\n  background: #111;\n  padding: 20px;\n  /* Добавьте Flexbox-свойства ниже */\n  \n}' 
          }
        ]
      }
    ]
  },
  {
    _id: 'js-core',
    courseId: 'js-core',
    title: 'JS Логика',
    iconType: 'FileJs',
    lessonsCount: 6,
    description: 'Динамическое взаимодействие. DOM-дерево, события и обработка данных.',
    modules: [
      {
        _id: 'm-js-1',
        title: 'Работа с DOM',
        lessons: [
          { 
            _id: 'l-j-1', 
            title: 'Теория: Захват элементов', 
            type: 'theory', 
            theory: 'JavaScript может изменять HTML на лету. Но сначала нужно найти нужный элемент на странице.\n\nДля этого используется метод document.querySelector("селектор").\nНапример:\nconst btn = document.querySelector(".my-button");\n\nПосле захвата элемента мы можем менять его свойства, например textContent (текст внутри тега).' 
          },
          { 
            _id: 'l-j-2', 
            title: 'Практика: Подмена данных', 
            type: 'practice', 
            theory: 'HTML и CSS уже настроены. Перейдите во вкладку script.js.', 
            task: 'Найдите элемент с классом .status-text с помощью querySelector. Сохраните его в константу, а затем измените его textContent на "ОНЛАЙН".', 
            initialHtml: '<div class="server-card">\n  <h3>Сервер Альфа</h3>\n  <div class="status-text">ОФФЛАЙН</div>\n</div>',
            initialCss: '.server-card { background: #1a1a1a; padding: 20px; color: white; border: 1px solid #333; width: 200px; }\n.status-text { color: red; font-family: monospace; }',
            initialJs: '// 1. Найдите элемент:\n\n// 2. Измените его текст:\n' 
          }
        ]
      },
      {
        _id: 'm-js-2',
        title: 'Слушатели событий',
        lessons: [
          { 
            _id: 'l-j-3', 
            title: 'Теория: Реакция на клик', 
            type: 'theory', 
            theory: 'Чтобы интерфейс реагировал на действия пользователя, мы "вешаем" на элементы слушатели событий — addEventListener.\n\nСинтаксис:\nbutton.addEventListener("click", function() {\n  // Код, который выполнится при клике\n});' 
          },
          { 
            _id: 'l-j-4', 
            title: 'Практика: Триггер тревоги', 
            type: 'practice', 
            theory: 'Свяжем логику и стили. При клике будем добавлять класс .danger к контейнеру.', 
            task: 'Найдите кнопку .hack-btn и контейнер .system-core. Добавьте кнопке слушатель события "click". При клике меняйте текст контейнера (textContent) на "ВЗЛОМАНО".', 
            initialHtml: '<div class="system-core">Система стабильна</div>\n<button class="hack-btn">Атаковать</button>',
            initialCss: '.system-core { padding: 20px; border: 2px solid #333; color: #888; margin-bottom: 15px; }\n.hack-btn { background: orange; border: none; padding: 10px 20px; cursor: pointer; }',
            initialJs: 'const btn = document.querySelector(".hack-btn");\nconst core = document.querySelector(".system-core");\n\n// Добавьте слушатель событий ниже:\n' 
          }
        ]
      }
    ]
  }
];

export const useCourseStore = create(
  persist(
    (set, get) => ({
      courses: defaultCourses,

      addCourse: (courseData) => set((state) => {
        const newCourse = {
          ...courseData,
          _id: Date.now().toString(),
          modules: [{ _id: 'm_init_' + Date.now(), title: 'Вводный модуль', lessons: [] }],
          lessonsCount: 0
        };
        return { courses: [...state.courses, newCourse] };
      }),

      addModule: (courseId, title) => set((state) => ({
        courses: state.courses.map(c => {
          if (c._id !== courseId) return c;
          return {
            ...c,
            modules: [...c.modules, { _id: 'm_' + Date.now(), title: title || 'Новый модуль', lessons: [] }]
          };
        })
      })),

      updateCourse: (id, courseData) => set((state) => ({
        courses: state.courses.map(c => c._id === id ? { ...c, ...courseData } : c)
      })),

      deleteCourse: (id) => set((state) => ({
        courses: state.courses.filter(c => c._id !== id)
      })),

      addLesson: (courseId, moduleId, lessonData) => set((state) => {
        const lessonId = Date.now().toString();
        return {
          courses: state.courses.map(c => {
            if (c._id !== courseId) return c;
            
            let updatedModules = [...c.modules];
            const moduleIdx = updatedModules.findIndex(m => m._id === moduleId);
            
            if (moduleIdx === -1) {
              updatedModules.push({
                _id: moduleId,
                title: 'Новый модуль',
                lessons: [{ ...lessonData, _id: lessonId }]
              });
            } else {
              updatedModules[moduleIdx] = {
                ...updatedModules[moduleIdx],
                lessons: [...updatedModules[moduleIdx].lessons, { ...lessonData, _id: lessonId }]
              };
            }

            return {
              ...c,
              modules: updatedModules,
              lessonsCount: c.lessonsCount + 1
            };
          })
        };
      }),

      updateLesson: (courseId, moduleId, lessonId, lessonData) => set((state) => ({
        courses: state.courses.map(c => {
          if (c._id !== courseId) return c;
          return {
            ...c,
            modules: c.modules.map(m => {
              if (m._id !== moduleId) return m;
              return {
                ...m,
                lessons: m.lessons.map(l => l._id === lessonId ? { ...l, ...lessonData } : l)
              };
            })
          };
        })
      })),

      deleteLesson: (courseId, moduleId, lessonId) => set((state) => ({
        courses: state.courses.map(c => {
          if (c._id !== courseId) return c;
          return {
            ...c,
            modules: c.modules.map(m => {
              if (m._id !== moduleId) return m;
              return {
                ...m,
                lessons: m.lessons.filter(l => l._id !== lessonId)
              };
            }),
            lessonsCount: Math.max(0, c.lessonsCount - 1)
          };
        })
      }))

    }),
    {
      name: 'devex-courses-storage'
    }
  )
);