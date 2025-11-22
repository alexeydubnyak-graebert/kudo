# FileBrowser Component

Компонент файлового браузера для темного интерфейса, использующий foundation-colors токены.

## 🎯 Особенности

- ✅ **Foundation Colors** - использует новую систему токенов
- ✅ **Темная тема** - оптимизирован для темного интерфейса
- ✅ **Статусы файлов** - synced, error, warning, info
- ✅ **Интерактивность** - hover, selected состояния
- ✅ **Типы файлов** - файлы и папки
- ✅ **Форматирование** - размер файлов, даты
- ✅ **Доступность** - семантическая разметка

## 📦 Использование

### Базовый пример

```jsx
import FileBrowser from "./components/FileBrowser/FileBrowser";

const files = [
  {
    id: 1,
    name: "Document.pdf",
    type: "file",
    size: 2457600,
    modifiedAt: "2025-01-15T10:30:00",
    status: "synced",
  },
  {
    id: 2,
    name: "Projects",
    type: "folder",
    size: null,
    modifiedAt: "2025-01-14T15:45:00",
    status: "synced",
  },
];

function App() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <FileBrowser
      files={files}
      selectedId={selectedId}
      onFileSelect={(file) => setSelectedId(file.id)}
      onFileDoubleClick={(file) => console.log("Open:", file)}
    />
  );
}
```

### С обработчиками

```jsx
<FileBrowser
  files={files}
  selectedId={selectedId}
  onFileSelect={(file) => {
    setSelectedId(file.id);
    console.log("Selected:", file);
  }}
  onFileDoubleClick={(file) => {
    if (file.type === "folder") {
      navigateToFolder(file.id);
    } else {
      openFile(file.id);
    }
  }}
/>
```

## 🎨 Props

| Prop                | Type                   | Default | Description                   |
| ------------------- | ---------------------- | ------- | ----------------------------- |
| `files`             | `File[]`               | `[]`    | Массив файлов для отображения |
| `selectedId`        | `string \| number`     | `null`  | ID выбранного файла           |
| `onFileSelect`      | `(file: File) => void` | `null`  | Callback при выборе файла     |
| `onFileDoubleClick` | `(file: File) => void` | `null`  | Callback при двойном клике    |

### File Object

```typescript
interface File {
  id: string | number; // Уникальный ID
  name: string; // Имя файла/папки
  type: "file" | "folder"; // Тип
  size: number | null; // Размер в байтах (null для папок)
  modifiedAt: string; // ISO дата изменения
  status: "synced" | "error" | "warning" | "info"; // Статус
}
```

## 🎨 Используемые токены

### Foundation Colors

```css
/* Фоны */
--browser-background
--browser-background-alt
--browser-row-bg
--browser-row-hover
--browser-row-selected

/* Текст */
--browser-text
--browser-text-secondary
--text-on-primary

/* Границы */
--browser-border-row
--browser-border-grid

/* Статусы */
--browser-status-synced
--browser-status-error
--browser-status-warning
--browser-status-info

/* Header */
--header-background
--header-text
--header-border-bottom
```

## 🎯 Состояния файлов

### Synced (Синхронизировано)

```jsx
{
  status: "synced";
}
```

Зеленый бейдж - файл успешно синхронизирован

### Error (Ошибка)

```jsx
{
  status: "error";
}
```

Красный бейдж - ошибка синхронизации или загрузки

### Warning (Предупреждение)

```jsx
{
  status: "warning";
}
```

Желтый бейдж - требуется внимание

### Info (Информация)

```jsx
{
  status: "info";
}
```

Синий бейдж - информационный статус (например, расшарено)

## 💡 Примеры

### Пустое состояние

```jsx
<FileBrowser files={[]} />
```

Автоматически показывает пустое состояние с иконкой и сообщением.

### С фильтрацией

```jsx
const [filter, setFilter] = useState("");

const filteredFiles = files.filter((file) =>
  file.name.toLowerCase().includes(filter.toLowerCase())
);

<FileBrowser files={filteredFiles} />;
```

### С сортировкой

```jsx
const sortedFiles = [...files].sort((a, b) => a.name.localeCompare(b.name));

<FileBrowser files={sortedFiles} />;
```

## 🎨 Кастомизация

### Переопределение стилей

```css
/* Изменить высоту строки */
.file-browser__row {
  height: 48px;
}

/* Изменить шрифт */
.file-browser__cell {
  font-family: "Custom Font", sans-serif;
}

/* Изменить цвет hover */
.file-browser__row:hover {
  background: var(--states-hover);
}
```

### Добавление колонок

Отредактируйте `FileBrowser.jsx` и добавьте новые `<th>` и `<td>`:

```jsx
<thead>
  <tr>
    <th>Имя</th>
    <th>Размер</th>
    <th>Изменен</th>
    <th>Владелец</th> {/* Новая колонка */}
    <th>Статус</th>
  </tr>
</thead>
```

## 📊 Демо

Запустите демо-компонент:

```jsx
import FileBrowserDemo from "./components/FileBrowser/FileBrowserDemo";

function App() {
  return <FileBrowserDemo />;
}
```

Демо включает:

- 8 примеров файлов с разными статусами
- Интерактивный выбор
- Палитру foundation colors
- Примеры использования токенов

## 🔧 Интеграция

1. Убедитесь, что импортирован `foundation-colors.css`:

```css
/* src/index.css */
@import "./styles/tokens/foundation-colors.css";
```

2. Импортируйте компонент:

```jsx
import FileBrowser from "./components/FileBrowser/FileBrowser";
```

3. Используйте в приложении:

```jsx
<FileBrowser files={yourFiles} />
```

## 🎨 Цветовая схема

Компонент использует темную цветовую схему:

- **Фон страницы**: `#141518` (gray900)
- **Фон таблицы**: `#1E2023` (gray800)
- **Фон header**: `#242629` (gray700)
- **Hover**: `#2A2C2F` (gray600)
- **Selected**: `#254CA8` (primary)
- **Текст**: `#FFFFFF` (white)
- **Вторичный текст**: `#787A80` (gray200)

## 🚀 Производительность

- Используйте `React.memo` для оптимизации:

```jsx
const FileBrowser = React.memo(({ files, selectedId, onFileSelect }) => {
  // ...
});
```

- Виртуализация для больших списков:

```jsx
import { FixedSizeList } from "react-window";
```

## 📝 TODO

- [ ] Виртуализация для больших списков
- [ ] Drag & Drop
- [ ] Множественный выбор
- [ ] Контекстное меню
- [ ] Сортировка по колонкам
- [ ] Фильтрация
- [ ] Поиск
- [ ] Breadcrumbs навигация
