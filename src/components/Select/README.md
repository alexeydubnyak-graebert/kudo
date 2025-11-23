# Select Component

Универсальный компонент выпадающего списка с поддержкой поиска, иконок и кастомных опций.

## Возможности

- ✅ Dropdown меню с анимацией
- ✅ Поддержка иконок в опциях
- ✅ Поиск по опциям (searchable)
- ✅ Отключенные опции
- ✅ Навигация с клавиатуры (Arrow Up/Down, Enter, Escape)
- ✅ Три размера (small, medium, large)
- ✅ Валидация с отображением ошибок
- ✅ Disabled состояние
- ✅ Использует только существующие токены

## Props

| Prop          | Type                                      | Default              | Description                            |
| ------------- | ----------------------------------------- | -------------------- | -------------------------------------- |
| `options`     | `Array<{value, label, icon?, disabled?}>` | `[]`                 | Массив опций                           |
| `value`       | `string \| number`                        | `null`               | Выбранное значение                     |
| `onChange`    | `function`                                | -                    | Обработчик изменения `(value) => void` |
| `placeholder` | `string`                                  | `'Select option...'` | Placeholder текст                      |
| `disabled`    | `boolean`                                 | `false`              | Отключен ли select                     |
| `searchable`  | `boolean`                                 | `false`              | Включить поиск                         |
| `size`        | `'small' \| 'medium' \| 'large'`          | `'medium'`           | Размер компонента                      |
| `className`   | `string`                                  | `''`                 | Дополнительные CSS классы              |
| `error`       | `string`                                  | `null`               | Текст ошибки                           |

## Использование

### Basic Select

```jsx
import Select from "./components/Select";
import { useState } from "react";

const [value, setValue] = useState(null);

<Select
  options={[
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Choose an option..."
/>;
```

### With Icons

```jsx
const options = [
  {
    value: "folder",
    label: "Folder",
    icon: <FolderIcon />,
  },
  {
    value: "file",
    label: "File",
    icon: <FileIcon />,
  },
];

<Select options={options} value={value} onChange={setValue} />;
```

### Searchable Select

```jsx
<Select
  options={manyOptions}
  value={value}
  onChange={setValue}
  searchable
  placeholder="Search options..."
/>
```

### With Disabled Options

```jsx
const options = [
  { value: "1", label: "Available Option" },
  { value: "2", label: "Disabled Option", disabled: true },
  { value: "3", label: "Another Available" },
];

<Select options={options} value={value} onChange={setValue} />;
```

### Sizes

```jsx
// Small
<Select size="small" options={options} value={value} onChange={setValue} />

// Medium (default)
<Select size="medium" options={options} value={value} onChange={setValue} />

// Large
<Select size="large" options={options} value={value} onChange={setValue} />
```

### With Error

```jsx
<Select
  options={options}
  value={value}
  onChange={setValue}
  error="This field is required"
/>
```

### Disabled State

```jsx
<Select options={options} value={value} disabled />
```

## Keyboard Navigation

- **Arrow Down** - открыть меню / перейти к следующей опции
- **Arrow Up** - перейти к предыдущей опции
- **Enter** - выбрать опцию / открыть меню
- **Escape** - закрыть меню

## Структура опций

```typescript
interface Option {
  value: string | number; // Уникальное значение
  label: string; // Отображаемый текст
  icon?: ReactNode; // Опциональная иконка
  disabled?: boolean; // Отключена ли опция
}
```

## Токены

Компонент использует только существующие foundation-colors токены:

### Основные

- `--surface-base` - фон select и dropdown
- `--surface-hover` - hover состояние
- `--surface-alt` - фон поля поиска
- `--text-primary` - основной текст
- `--text-secondary` - вторичный текст (стрелка)
- `--text-muted` - placeholder и пустое состояние

### Границы

- `--border-default` - обводка по умолчанию
- `--border-strong` - обводка при hover
- `--border-subtle` - разделители

### Состояния

- `--foundation-primary` - focus и выбранная опция
- `--foundation-primary-alpha-10` - фон выбранной опции
- `--foundation-primary-alpha-20` - hover выбранной опции
- `--states-disabled-bg` - фон disabled
- `--states-disabled-text` - текст disabled
- `--semantic-error` - цвет ошибки

## Примеры

Смотрите `Select.stories.jsx` для интерактивных примеров всех вариантов использования.
