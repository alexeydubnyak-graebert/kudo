# Button Component

Универсальный компонент кнопки с поддержкой различных вариантов и иконок.

## Варианты (Variants)

- **Primary** - основная кнопка с заливкой
- **Secondary** - вторичная кнопка с обводкой

## Позиции иконок (Icon Positions)

- **Default** - без иконки
- **IconLeft** - иконка слева от текста
- **IconRight** - иконка справа от текста
- **IconOnly** - только иконка без текста

## Props

| Prop           | Type                                  | Default     | Description                |
| -------------- | ------------------------------------- | ----------- | -------------------------- |
| `variant`      | `'primary' \| 'secondary'`            | `'primary'` | Вариант кнопки             |
| `iconPosition` | `'left' \| 'right' \| 'only' \| null` | `null`      | Позиция иконки             |
| `icon`         | `ReactNode`                           | `null`      | Иконка (SVG или компонент) |
| `children`     | `ReactNode`                           | -           | Текст кнопки               |
| `disabled`     | `boolean`                             | `false`     | Отключена ли кнопка        |
| `onClick`      | `function`                            | -           | Обработчик клика           |
| `className`    | `string`                              | `''`        | Дополнительные CSS классы  |
| `type`         | `'button' \| 'submit' \| 'reset'`     | `'button'`  | Тип кнопки                 |

## Использование

### Default (без иконки)

```jsx
import Button from './components/Button';

<Button variant="primary">
  Click Me
</Button>

<Button variant="secondary">
  Cancel
</Button>
```

### Icon Left

```jsx
import Button from "./components/Button";
import { PlusIcon } from "./icons";

<Button variant="primary" iconPosition="left" icon={<PlusIcon />}>
  Create New
</Button>;
```

### Icon Right

```jsx
import Button from "./components/Button";
import { DownloadIcon } from "./icons";

<Button variant="primary" iconPosition="right" icon={<DownloadIcon />}>
  Download
</Button>;
```

### Icon Only

```jsx
import Button from "./components/Button";
import { SearchIcon } from "./icons";

<Button variant="primary" iconPosition="only" icon={<SearchIcon />} />;
```

### Disabled

```jsx
<Button variant="primary" disabled>
  Disabled Button
</Button>
```

### With onClick

```jsx
<Button variant="primary" onClick={() => console.log("Button clicked!")}>
  Click Me
</Button>
```

### Custom Classes

```jsx
<Button variant="primary" className="button--large button--full-width">
  Large Full Width Button
</Button>
```

## Дополнительные классы

Можно использовать дополнительные классы для изменения размера:

- `button--small` - маленькая кнопка
- `button--large` - большая кнопка
- `button--full-width` - кнопка на всю ширину

```jsx
<Button variant="primary" className="button--small">
  Small Button
</Button>

<Button variant="primary" className="button--large">
  Large Button
</Button>

<Button variant="primary" className="button--full-width">
  Full Width Button
</Button>
```

## Токены

Компонент использует только существующие foundation-colors токены:

### Primary

- `--foundation-primary` - основной цвет
- `--foundation-primary-alpha-30` - hover состояние
- `--text-on-primary` - цвет текста
- `--states-active` - active состояние
- `--states-focus` - focus состояние

### Secondary

- `--text-primary` - цвет текста
- `--border-default` - цвет обводки
- `--border-strong` - цвет обводки при hover
- `--surface-hover` - фон при hover
- `--states-active` - active состояние

### Disabled

- `--states-disabled-bg` - фон отключенной кнопки
- `--states-disabled-text` - цвет текста отключенной кнопки
- `--border-subtle` - обводка отключенной secondary кнопки

## Примеры

Смотрите `Button.stories.jsx` для интерактивных примеров всех вариантов кнопок.
