/**
 * Утилиты для работы с темами
 */

/**
 * Получить текущую тему
 */
export function getTheme() {
  const theme = document.documentElement.getAttribute('data-theme');
  if (theme) return theme;
  
  // Проверяем системные настройки
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
}

/**
 * Установить тему
 */
export function setTheme(theme) {
  if (theme !== 'light' && theme !== 'dark') {
    console.warn(`Invalid theme: ${theme}. Using 'light' instead.`);
    theme = 'light';
  }
  
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

/**
 * Переключить тему
 */
export function toggleTheme() {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  return newTheme;
}

/**
 * Инициализировать тему из localStorage или системных настроек
 */
export function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Используем системные настройки
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(systemTheme);
  }
}

/**
 * Подписаться на изменения системной темы
 */
export function watchSystemTheme(callback) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handler = (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    callback(newTheme);
  };
  
  // Современный API
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }
  
  // Устаревший API для совместимости
  mediaQuery.addListener(handler);
  return () => mediaQuery.removeListener(handler);
}

/**
 * React Hook для работы с темой
 */
export function useTheme() {
  if (typeof window === 'undefined') {
    return { theme: 'light', setTheme: () => {}, toggleTheme: () => {} };
  }
  
  const [theme, setThemeState] = React.useState(getTheme);
  
  React.useEffect(() => {
    initTheme();
    setThemeState(getTheme());
    
    // Подписываемся на изменения системной темы
    const unsubscribe = watchSystemTheme((newTheme) => {
      // Обновляем только если пользователь не установил тему вручную
      if (!localStorage.getItem('theme')) {
        setTheme(newTheme);
        setThemeState(newTheme);
      }
    });
    
    return unsubscribe;
  }, []);
  
  const handleSetTheme = (newTheme) => {
    setTheme(newTheme);
    setThemeState(newTheme);
  };
  
  const handleToggleTheme = () => {
    const newTheme = toggleTheme();
    setThemeState(newTheme);
    return newTheme;
  };
  
  return {
    theme,
    setTheme: handleSetTheme,
    toggleTheme: handleToggleTheme,
  };
}

// Для использования без React
if (typeof window !== 'undefined') {
  window.AresTheme = {
    get: getTheme,
    set: setTheme,
    toggle: toggleTheme,
    init: initTheme,
    watch: watchSystemTheme,
  };
}
