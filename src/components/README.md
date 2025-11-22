# Компоненты ARES kudo

## 📁 Структура

```
components/
├── Button/           # Кнопки
├── RibbonItem/       # Элементы ленты
├── SplitArrow/       # Разделенные кнопки
├── Tooltip/          # Всплывающие подсказки
├── Slider/           # Ползунки
└── common/           # Общие компоненты
```

## 🎯 Планируемые компоненты

### 1. Button (Кнопка)

- **Состояния**: standard, hover, pressed, active, disabled
- **Варианты**: primary, secondary, icon-only
- **Токены**: `--kudo-button-*`

### 2. RibbonItem (Элемент ленты)

- **Состояния**: standard, hover, pressed, active, disabled
- **С иконкой и текстом**
- **Токены**: `--kudo-ribbon-item-*`

### 3. SplitArrow (Разделенная кнопка)

- **Две части**: основная кнопка + стрелка
- **Dropdown меню**
- **Токены**: `--kudo-split-arrow-*`

### 4. Tooltip (Подсказка)

- **Позиционирование**: top, bottom, left, right
- **Триггеры**: hover, click, focus
- **Токены**: `--kudo-tooltip-*`

### 5. Slider (Ползунок)

- **Типы**: horizontal, vertical
- **С метками и значениями**
- **Токены**: `--kudo-slider-*`

## 🛠 Соглашения

### Структура компонента

```
ComponentName/
├── ComponentName.jsx      # Основной компонент
├── ComponentName.css      # Стили компонента
├── ComponentName.test.jsx # Тесты
└── index.js               # Экспорт
```

### Пример компонента

```jsx
import "./Button.css";

export function Button({
  children,
  variant = "standard",
  active = false,
  disabled = false,
  onClick,
}) {
  return (
    <button
      className={`kudo-button ${variant} ${active ? "active" : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Стили компонента

```css
.kudo-button {
  background-color: var(--kudo-button-bg-standard);
  color: var(--kudo-button-text-standard);
  border: 1px solid var(--kudo-button-border-standard);
  /* ... */
}
```

## 📝 Следующие шаги

1. Создать базовые компоненты
2. Добавить Storybook для документации
3. Написать тесты
4. Создать примеры использования
