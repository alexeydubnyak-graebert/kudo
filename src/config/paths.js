/**
 * Конфигурация путей к ресурсам
 * Используйте переменную окружения VITE_ICONS_PATH для настройки пути к иконкам
 * 
 * Поддерживаемые форматы:
 * - ~/Documents/GitHub/application-icons (автоматически раскрывается в vite.config.js)
 * - ../../../application-icons (относительный путь)
 * - /absolute/path/to/application-icons (абсолютный путь)
 */

// Используем алиас @icons, настроенный в vite.config.js
export const ICONS_BASE_PATH = '@icons';

/**
 * Получить путь к иконке
 * @param {string} category - категория (например, 'draw', 'modify', и т.д.)
 * @param {string} theme - тема ('light' или 'dark')
 * @param {string} iconName - имя файла иконки
 * @returns {string} полный путь к иконке
 */
export const getIconPath = (category, theme, iconName) => {
    // Структура: application-icons/Modules/Desktop/ARGONQT/Resources/svg_icons/{theme}/{category}/{iconName}
    return `${ICONS_BASE_PATH}/Modules/Desktop/ARGONQT/Resources/svg_icons/${theme}/${category}/${iconName}`;
};
