/**
 * Парсер XML конфигурации для Ribbon
 */

/**
 * Парсит XML строку в объект конфигурации
 * @param {string} xmlString - XML строка конфигурации
 * @returns {Object} Объект конфигурации ribbon
 */
export const parseRibbonConfig = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    
    const ribbonElement = xmlDoc.querySelector('ribbon');
    if (!ribbonElement) {
        throw new Error('Invalid ribbon configuration: missing <ribbon> root element');
    }
    
    const sections = Array.from(ribbonElement.querySelectorAll('section')).map(parseSection);
    
    return { sections };
};

/**
 * Парсит секцию ribbon
 */
const parseSection = (sectionElement) => {
    const name = sectionElement.getAttribute('name');
    const rows = Array.from(sectionElement.querySelectorAll(':scope > row')).map(parseRow);
    
    return {
        name,
        rows
    };
};

/**
 * Парсит ряд элементов
 */
const parseRow = (rowElement) => {
    const items = Array.from(rowElement.children).map(parseItem);
    return { items };
};

/**
 * Парсит элемент (ribbonItem, splitButton, select)
 */
const parseItem = (itemElement) => {
    const type = itemElement.tagName.toLowerCase();
    const id = itemElement.getAttribute('id');
    const label = itemElement.getAttribute('label') || '';
    const icon = itemElement.getAttribute('icon') || '';
    const iconLight = itemElement.getAttribute('icon-light') || '';
    const iconDark = itemElement.getAttribute('icon-dark') || '';
    
    const baseItem = {
        type,
        id,
        label,
        icon,
        iconLight,
        iconDark
    };
    
    // Обработка splitButton с dropdown
    if (type === 'splitbutton') {
        const dropdownElement = itemElement.querySelector('dropdown');
        if (dropdownElement) {
            baseItem.dropdown = parseDropdown(dropdownElement);
        }
    }
    
    // Обработка select
    if (type === 'select') {
        baseItem.width = itemElement.getAttribute('width') || '150';
    }
    
    return baseItem;
};

/**
 * Парсит dropdown меню
 */
const parseDropdown = (dropdownElement) => {
    const items = [];
    
    Array.from(dropdownElement.children).forEach(child => {
        if (child.tagName.toLowerCase() === 'item') {
            items.push(parseDropdownItem(child));
        } else if (child.tagName.toLowerCase() === 'group') {
            items.push(parseDropdownGroup(child));
        }
    });
    
    return { items };
};

/**
 * Парсит элемент dropdown
 */
const parseDropdownItem = (itemElement) => {
    return {
        type: 'item',
        id: itemElement.getAttribute('id'),
        label: itemElement.getAttribute('label'),
        icon: itemElement.getAttribute('icon'),
        iconLight: itemElement.getAttribute('icon-light') || '',
        iconDark: itemElement.getAttribute('icon-dark') || ''
    };
};

/**
 * Парсит группу элементов dropdown
 */
const parseDropdownGroup = (groupElement) => {
    const dividers = groupElement.getAttribute('dividers') === 'true';
    const dividerTop = groupElement.getAttribute('divider-top') === 'true';
    const dividerBottom = groupElement.getAttribute('divider-bottom') === 'true';
    const items = Array.from(groupElement.querySelectorAll('item')).map(parseDropdownItem);
    
    return {
        type: 'group',
        dividers,
        dividerTop,
        dividerBottom,
        items
    };
};

/**
 * Загружает конфигурацию из XML файла
 * @param {string} xmlPath - путь к XML файлу
 * @returns {Promise<Object>} Объект конфигурации
 */
export const loadRibbonConfig = async (xmlPath) => {
    try {
        const response = await fetch(xmlPath);
        const xmlString = await response.text();
        return parseRibbonConfig(xmlString);
    } catch (error) {
        console.error('Failed to load ribbon configuration:', error);
        throw error;
    }
};
