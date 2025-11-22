# ARES kudo - Дизайн-система

## 📋 Обзор

Мультибрендовая дизайн-система для семейства продуктов ARES с поддержкой:

- ✅ Светлой и темной темы
- ✅ Глобальных токенов для всех брендов
- ✅ Специфичных токенов для каждого продукта
- ✅ Семантических переменных для удобства использования

## 🎨 Структура токенов

### 1. Глобальные токены (`globalColorTokens`)

Базовые переменные, используемые всеми брендами:

```css
/* Состояния фона */
--states-bg-primary-standard
--states-bg-primary-hover
--states-bg-primary-pressed
--states-bg-primary-active
--states-bg-primary-disabled

/* Цвета текста */
--text-color-default
--states-text-color-standard
--states-text-color-active
--states-text-color-disabled

/* Границы */
--states-border-primary-*
--states-border-secondary-*
```

### 2. ARES kudo токены

Специфичные переменные для ARES kudo:

```css
/* Кнопки */
--kudo-button-text-*
--kudo-button-bg-*
--kudo-button-border-*
--kudo-button-icon-*

/* Ribbon элементы */
--kudo-ribbon-item-*

/* Split Arrow */
--kudo-split-arrow-*

/* Tooltip */
--kudo-tooltip-bg
--kudo-tooltip-border
--kudo-tooltip-text
```

### 3. Семантические переменные

Удобные алиасы для частого использования:

```css
--color-primary
--color-secondary
--color-text
--color-text-muted
--color-border
--color-hover
--color-active
--color-disabled
```

## 🌓 Переключение темы

### Программное переключение

```javascript
// Установить темную тему
document.documentElement.setAttribute("data-theme", "dark");

// Установить светлую тему
document.documentElement.setAttribute("data-theme", "light");

// Удалить атрибут (использовать системную тему)
document.documentElement.removeAttribute("data-theme");
```

### Автоматическое определение

Система автоматически применяет темную тему, если:

- Не установлен атрибут `data-theme`
- Системные настройки пользователя установлены на темную тему

## 💡 Примеры использования

### Кнопка с токенами kudo

```css
.my-button {
  background-color: var(--kudo-button-bg-standard);
  color: var(--kudo-button-text-standard);
  border: 1px solid var(--kudo-button-border-standard);
  transition: all var(--transition-fast);
}

.my-button:hover {
  background-color: var(--kudo-button-bg-hover);
  border-color: var(--kudo-button-border-hover);
}

.my-button:active {
  background-color: var(--kudo-button-bg-pressed);
  border-color: var(--kudo-button-border-pressed);
}

.my-button.active {
  background-color: var(--kudo-button-bg-active);
  color: var(--kudo-button-text-active);
  border-color: var(--kudo-button-border-active);
}

.my-button:disabled {
  background-color: var(--kudo-button-bg-disabled);
  color: var(--kudo-button-text-disabled);
  border-color: var(--kudo-button-border-disabled);
  cursor: not-allowed;
}
```

### Использование семантических переменных

```css
.card {
  background-color: var(--bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--color-hover);
}
```

### Ribbon элемент

```css
.ribbon-item {
  background-color: var(--kudo-ribbon-item-bg-standard);
  color: var(--kudo-ribbon-item-text-standard);
  border: 1px solid var(--kudo-ribbon-item-border-standard);
  padding: 8px 12px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.ribbon-item:hover {
  background-color: var(--kudo-ribbon-item-bg-hover);
  border-color: var(--kudo-ribbon-item-border-hover);
}

.ribbon-item.active {
  background-color: var(--kudo-ribbon-item-bg-active);
  color: var(--kudo-ribbon-item-text-active);
  border-color: var(--kudo-ribbon-item-border-active);
}
```

## 🎯 Состояния компонентов

Все интерактивные компоненты поддерживают 5 состояний:

1. **Standard** - обычное состояние
2. **Hover** - при наведении курсора
3. **Pressed** - при нажатии
4. **Active** - активное/выбранное состояние
5. **Disabled** - неактивное состояние

## 🔧 Расширение системы

### Добавление нового бренда

1. Добавьте токены в `tokens.json`:

```json
{
  "newBrand": {
    "buttonBackground": {
      "light": "#color",
      "dark": "#color"
    }
  }
}
```

2. Создайте CSS переменные в `tokens.css`:

```css
:root {
  --new-brand-button-bg: #color;
}

:root[data-theme="dark"] {
  --new-brand-button-bg: #color;
}
```

### Добавление новых токенов

1. Определите токен в `globalColorTokens` для общих переменных
2. Или в специфичном разделе бренда для уникальных переменных
3. Создайте соответствующие CSS переменные
4. Документируйте использование

## 📦 Файлы системы

```
src/styles/
├── tokens.css       # CSS переменные из tokens.json
├── base.css         # Базовые стили и утилиты
└── index.css        # Главный файл импорта

tokens.json          # Исходные дизайн-токены
tokens-formatted.json # Отформатированная версия
```

## 🎨 Утилитарные классы

Система предоставляет утилитарные классы для быстрой разработки:

```html
<!-- Flexbox -->
<div class="flex items-center justify-between gap-4">
  <!-- Отступы -->
  <div class="mt-4 mb-2 p-3">
    <!-- Текст -->
    <p class="text-center">
      <!-- Анимации -->
    </p>

    <div class="fade-in"></div>
  </div>
</div>
```

## 🚀 Следующие шаги

1. ✅ Создание CSS переменных
2. 🔄 Создание компонентов (Button, Ribbon, Tooltip, etc.)
3. 🔄 Создание Storybook для документации
4. 🔄 Создание тестов для компонентов
5. 🔄 Интеграция с Figma через Code Connect
