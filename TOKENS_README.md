# 🎨 Система дизайн-токенов ARES kudo

## Обзор

Мультибрендовая система дизайн-токенов, позволяющая создавать консистентные интерфейсы для всех продуктов ARES с единой базой и специфичными настройками для каждого бренда.

## 📊 Структура tokens.json

```json
{
  "globalColorTokens": {
    // 47 глобальных токенов для всех брендов
    // Базовые состояния: standard, hover, pressed, active, disabled
  },
  "globalPalette": {
    // 482 цвета в палитре
  },
  "aRESkudo": {
    // 74 специфичных токена для ARES kudo
  },
  "aRESCommander": {
    // 67 токенов для ARES Commander
  },
  "xDraftSight": {
    // 106 токенов для DraftSight
  }
}
```

## 🎯 Философия системы

### Глобальные токены (Global Color Tokens)

Базовые переменные, используемые всеми брендами:

- **States** - состояния элементов (standard, hover, pressed, active, disabled)
- **Background** - фоновые цвета (primary, secondary)
- **Text** - цвета текста
- **Border** - границы элементов
- **Icon** - цвета иконок

### Специфичные токены брендов

Каждый бренд имеет свои токены для:

- **Button** - кнопки и их состояния
- **Ribbon** - элементы ленты интерфейса
- **Tooltip** - всплывающие подсказки
- **Split Arrow** - разделенные кнопки со стрелками
- **Slider** - ползунки

### Темизация

Каждый токен имеет два значения:

```json
{
  "tokenName": {
    "light": "#цвет_для_светлой_темы",
    "dark": "#цвет_для_темной_темы"
  }
}
```

## 🛠 Работа с токенами

### Генерация CSS переменных

```bash
# Сгенерировать tokens.css из tokens.json
npm run generate:tokens

# Автоматическая регенерация при изменении tokens.json
npm run tokens:watch
```

### Использование в CSS

```css
/* Глобальные токены */
.element {
  background-color: var(--states-background-primary-standard);
  color: var(--states-text-color-standard);
  border: 1px solid var(--states-border-secondary-standard);
}

/* Токены ARES kudo */
.button {
  background-color: var(--kudo-button-bg-standard);
  color: var(--kudo-button-text-standard);
  border: 1px solid var(--kudo-button-border-standard);
}

.button:hover {
  background-color: var(--kudo-button-bg-hover);
  border-color: var(--kudo-button-border-hover);
}

.button.active {
  background-color: var(--kudo-button-bg-active);
  color: var(--kudo-button-text-active);
}
```

### Использование в React

```jsx
function Button({ active, disabled, children }) {
  return (
    <button
      className={`button ${active ? "active" : ""}`}
      disabled={disabled}
      style={{
        backgroundColor: active
          ? "var(--kudo-button-bg-active)"
          : "var(--kudo-button-bg-standard)",
      }}
    >
      {children}
    </button>
  );
}
```

## 🌓 Переключение темы

### JavaScript

```javascript
// Установить темную тему
document.documentElement.setAttribute("data-theme", "dark");

// Установить светлую тему
document.documentElement.setAttribute("data-theme", "light");

// Удалить (использовать системную)
document.documentElement.removeAttribute("data-theme");
```

### React Hook

```jsx
import { useState, useEffect } from "react";

function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, setTheme, toggleTheme };
}
```

## 📝 Соглашения об именовании

### Паттерн именования токенов

```
[brand]Colors[Component][Property][State]
```

Примеры:

- `kudoColorsButtonBackgroundStandard`
- `kudoColorsRibbonItemTextColorHover`
- `kudoColorsSplitArrowBorderActive`

### CSS переменные

```
--[prefix]-[component]-[property]-[state]
```

Примеры:

- `--kudo-button-bg-standard`
- `--kudo-ribbon-item-text-hover`
- `--states-border-primary-active`

## 🔧 Добавление новых токенов

### 1. Обновите tokens.json

```json
{
  "aRESkudo": {
    "newComponentBackground": {
      "light": "#f5f5f6",
      "dark": "#333538"
    }
  }
}
```

### 2. Регенерируйте CSS

```bash
npm run generate:tokens
```

### 3. Используйте в коде

```css
.new-component {
  background-color: var(--kudo-new-component-background);
}
```

## 🎨 Категории токенов

### Background (Фон)

- `standard` - обычное состояние
- `hover` - при наведении
- `pressed` - при нажатии
- `active` - активное/выбранное
- `disabled` - неактивное

### Text (Текст)

- `standard` - обычный текст
- `active` - активный/выбранный
- `disabled` - неактивный
- `hover` - при наведении (для некоторых компонентов)

### Border (Границы)

- `standard` - обычная граница
- `hover` - при наведении
- `pressed` - при нажатии
- `active` - активная граница
- `disabled` - неактивная

### Icon (Иконки)

- `standard` - обычная иконка
- `hover` - при наведении
- `pressed` - при нажатии
- `active` - активная иконка
- `disabled` - неактивная

## 🚀 Примеры компонентов

### Кнопка с полной поддержкой состояний

```css
.kudo-button {
  /* Standard */
  background-color: var(--kudo-button-bg-standard);
  color: var(--kudo-button-text-standard);
  border: 1px solid var(--kudo-button-border-standard);
  transition: all 150ms ease;
}

.kudo-button:hover {
  background-color: var(--kudo-button-bg-hover);
  color: var(--kudo-button-text-hover);
  border-color: var(--kudo-button-border-hover);
}

.kudo-button:active {
  background-color: var(--kudo-button-bg-pressed);
  color: var(--kudo-button-text-pressed);
  border-color: var(--kudo-button-border-pressed);
}

.kudo-button.active {
  background-color: var(--kudo-button-bg-active);
  color: var(--kudo-button-text-active);
  border-color: var(--kudo-button-border-active);
}

.kudo-button.active:hover {
  background-color: var(--kudo-button-bg-active-hover);
  color: var(--kudo-button-text-active-hover);
  border-color: var(--kudo-button-border-active-hover);
}

.kudo-button:disabled {
  background-color: var(--kudo-button-bg-disabled);
  color: var(--kudo-button-text-disabled);
  border-color: var(--kudo-button-border-disabled);
  cursor: not-allowed;
}
```

## 📚 Дополнительные ресурсы

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Полная документация дизайн-системы
- [tokens.json](./tokens.json) - Исходные токены
- [src/styles/tokens.css](./src/styles/tokens.css) - Сгенерированные CSS переменные
- [scripts/generate-tokens.js](./scripts/generate-tokens.js) - Генератор токенов

## 🎯 Следующие шаги

1. ✅ Создана система токенов
2. ✅ Настроена генерация CSS
3. 🔄 Создание библиотеки компонентов
4. 🔄 Документация компонентов (Storybook)
5. 🔄 Интеграция с Figma
6. 🔄 Тесты компонентов
