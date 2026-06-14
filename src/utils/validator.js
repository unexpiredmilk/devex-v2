// ВАЖНО: Ключи объекта должны СТРОГО совпадать с полем title практических уроков
const validationRules = {
  // === ВЕКТОР: HTML ФУНДАМЕНТ ===
  "Практика: Инициализация": {
    rules: [
      { regex: /<h1[^>]*>[\s\S]*?devex terminal[\s\S]*?<\/h1>/, error: "Отсутствует тег <h1> с текстом 'DEVEX Terminal'." },
      { regex: /<p[^>]*>[\s\S]*?ожидание ввода данных\.\.\.[\s\S]*?<\/p>/, error: "Отсутствует тег <p> с текстом 'Ожидание ввода данных...'." }
    ]
  },
  "Практика: Шлюз авторизации": {
    rules: [
      { regex: /<form[^>]*>/, error: "Элементы не обернуты в тег <form>." },
      { regex: /<input[^>]*type=['"]text['"][^>]*>/, error: "Не найден тег <input> с атрибутом type=\"text\"." },
      { regex: /<input[^>]*placeholder=['"]введите позывной['"][^>]*>/, error: "Не найден <input> с атрибутом placeholder=\"Введите позывной\"." },
      { regex: /<button[^>]*>[\s\S]*?войти[\s\S]*?<\/button>/, error: "Отсутствует тег <button> с текстом 'Войти'." }
    ]
  },

  // === ВЕКТОР: CSS АУГМЕНТАЦИЯ ===
  "Практика: Кибер-кнопка": {
    rules: [
      { regex: /\.cyber-btn\s*{[^}]*color\s*:\s*(?:#00ff00|#0f0|rgb\(0,\s*255,\s*0\))/i, error: "Для .cyber-btn не задан зеленый цвет текста (#00ff00)." },
      { regex: /\.cyber-btn\s*{[^}]*background(?:-color)?\s*:\s*(?:#111111|#111)/i, error: "Для .cyber-btn не задан темный фон (#111111)." }
    ]
  },
  "Практика: Выравнивание панели": {
    rules: [
      { regex: /\.dashboard-panel\s*{[^}]*display\s*:\s*flex/i, error: "Контейнеру .dashboard-panel не задано свойство display: flex." },
      { regex: /\.dashboard-panel\s*{[^}]*justify-content\s*:\s*space-between/i, error: "Не добавлено свойство justify-content: space-between для распределения элементов." }
    ]
  },

  // === ВЕКТОР: JS ЛОГИКА ===
  "Практика: Подмена данных": {
    rules: [
      { regex: /querySelector\s*\(\s*['"]\.status-text['"]\s*\)/, error: "Элемент с классом .status-text не найден через querySelector." },
      { regex: /\.textcontent\s*=\s*['"]онлайн['"]/, error: "Свойство textContent не изменено на 'ОНЛАЙН'." }
    ]
  },
  "Практика: Триггер тревоги": {
    rules: [
      { regex: /querySelector\s*\(\s*['"]\.hack-btn['"]\s*\)/, error: "Кнопка .hack-btn не инициализирована в скрипте." },
      { regex: /querySelector\s*\(\s*['"]\.system-core['"]\s*\)/, error: "Контейнер .system-core не инициализирован в скрипте." },
      { regex: /addeventlistener\s*\(\s*['"]click['"]/, error: "На кнопку не добавлен слушатель событий (click)." },
      { regex: /\.textcontent\s*=\s*['"]взломано['"]/, error: "Внутри обработчика клика текст не меняется на 'ВЗЛОМАНО'." }
    ]
  }
};

export const validateCode = (lessonTitle, code) => {
  // На всякий случай дублируем toLowerCase для безопасного поиска
  const safeCode = code.toLowerCase();
  const lessonData = validationRules[lessonTitle];
  
  // Если для урока нет правил (например, это теория), пропускаем
  if (!lessonData) return { isValid: safeCode.trim().length > 5, error: "Код слишком короткий." };

  // Прогон по всем правилам конкретного урока
  for (let rule of lessonData.rules) {
    if (rule.regex && !rule.regex.test(safeCode)) {
      return { isValid: false, error: rule.error };
    }
    if (rule.test && !rule.test(safeCode)) {
      return { isValid: false, error: rule.error };
    }
  }

  // Защита от незакрытых тегов (базовая эвристика)
  const openDivs = (safeCode.match(/<div/g) || []).length;
  const closeDivs = (safeCode.match(/<\/div>/g) || []).length;
  if (openDivs !== closeDivs) {
    return { isValid: false, error: "Критическая ошибка: количество открывающих тегов <div> не совпадает с закрывающими." };
  }

  return { isValid: true, error: null };
};