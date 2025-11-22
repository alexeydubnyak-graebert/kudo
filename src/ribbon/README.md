# Ribbon Components

Компоненты для ленты интерфейса ARES kudo.

## Структура

```
ribbon/
├── RibbonItem/          # Базовый элемент ленты
├── SplitArrow/          # Стрелка для раскрывающихся меню
├── SplitButton/         # Кнопка с раскрывающимся меню (RibbonItem + SplitArrow)
├── LineDropdown/        # Дропдаун выбора типа линии
└── index.js             # Экспорт всех компонентов
```

## Использование

```jsx
import { RibbonItem, SplitArrow, SplitButton, LineDropdown } from './ribbon';

// Базовый элемент
<RibbonItem
  icon={<LineIcon />}
  label="Line"
  active={true}
  onClick={handleClick}
/>

// Стрелка для меню
<SplitArrow onClick={handleToggle} />

// Кнопка с меню
<SplitButton
  icon={<LineIcon />}
  label="Line"
  active={isActive}
  onClick={handleClick}
  onMenuClick={handleMenuToggle}
/>

// Дропдаун выбора линии
<LineDropdown />
```

## Иконки

Иконки для ribbon компонентов находятся в `src/icons/ribbon/`:

```
icons/ribbon/
└── home/
    └── draw/           # Иконки инструментов рисования
        ├── LineIcon.jsx
        ├── RectangleIcon.jsx
        ├── CircleIcon.jsx
        ├── PolylineIcon.jsx
        └── index.js
```

## Стилизация

Все компоненты используют систему токенов из `src/styles/tokens/`:

- **Цвета**: `--kudo-ribbon-item-*`
- **Размеры**: `--kudo-item-*`
- **Типографика**: `--font-family-kudo`, `--font-size-lg`, и т.д.

## Темы

Компоненты автоматически адаптируются к светлой и темной темам через систему токенов.
