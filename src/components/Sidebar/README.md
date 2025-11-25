# Sidebar Component

Боковая панель навигации для темного интерфейса, созданная на основе дизайна из Figma с использованием foundation-colors токенов и иконок из favourite-folders.

## 🎯 Особенности

- ✅ **Структура из Figma** - точное соответствие дизайну
- ✅ **Foundation Colors** - использует новую систему токенов
- ✅ **Иконки из favourite-folders** - SVG иконки из проекта
- ✅ **Раскрывающиеся секции** - с плавной анимацией
- ✅ **Активные состояния** - для секций и элементов
- ✅ **Hover эффекты** - интерактивность
- ✅ **Кнопка Collapse** - сворачивание sidebar
- ✅ **Footer** - с копирайтом и ссылками

## 📦 Использование

### Базовый пример

```jsx
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [activeSection, setActiveSection] = useState("my-files");
  const [activeItem, setActiveItem] = useState("kudo-storage");

  return (
    <Sidebar
      activeSection={activeSection}
      activeItem={activeItem}
      onNavigate={(section, item) => {
        setActiveSection(section);
        setActiveItem(item);
      }}
      onCollapse={() => console.log("Collapsed")}
    />
  );
}
```

### С обработчиками

```jsx
<Sidebar
  activeSection="my-files"
  activeItem="kudo-storage"
  onNavigate={(sectionId, itemId) => {
    console.log("Navigate to:", sectionId, itemId);
    // Обработка навигации
  }}
  onCollapse={() => {
    // Обработка сворачивания
  }}
/>
```

## 🎨 Props

| Prop            | Type                                           | Default          | Description                    |
| --------------- | ---------------------------------------------- | ---------------- | ------------------------------ |
| `activeSection` | `string`                                       | `'my-files'`     | ID активной секции             |
| `activeItem`    | `string`                                       | `'kudo-storage'` | ID активного элемента          |
| `onCollapse`    | `() => void`                                   | `null`           | Callback при клике на Collapse |
| `onNavigate`    | `(sectionId: string, itemId?: string) => void` | `null`           | Callback при навигации         |

## 📁 Структура

### Секции

1. **Collapse** - кнопка сворачивания
2. **My files** - файлы пользователя
   - ARES Kudo Drive
   - Google Drive
   - One Drive
   - Deleted files
3. **Resources** - ресурсы
   - My templates
   - My fonts
   - Trinity block library
   - Batch Process
4. **My profile** - профиль
   - Account data
   - Preferences
5. **Storage** - хранилище
6. **WebGL Test** - тест WebGL

### Footer

- © Graebert GmbH
- Terms of Use
- Privacy policy
- Версия приложения

## 🎨 Используемые токены

### Foundation Colors

```css
/* Фоны */
--sidebar-background: #141518           /* Основной фон */
--sidebar-background-hover: #1E2023     /* Hover состояние */
--sidebar-background-active: #254CA8    /* Активный элемент */

/* Текст */
--sidebar-text: #DADBDE                 /* Основной текст */
--sidebar-text-muted: #5B5D62           /* Приглушенный текст */

/* Иконки */
--sidebar-icon: #5B5D62                 /* Обычная иконка */
--sidebar-icon-active: #254CA8          /* Активная иконка */

/* Границы */
--sidebar-border-right: #2A2C2F         /* Правая граница */
```

### Дополнительные токены

```css
--text-on-primary: #FFFFFF              /* Текст на primary фоне */
--border-default: #2A2C2F               /* Стандартная граница */
--border-strong: #333538                /* Сильная граница */
--foundation-gray900: #141518           /* Фон секций */
--header-background-elevated: #242629   /* Фон expanded header */
```

## 🎯 Состояния

### Section Header

- **Standard** - обычное состояние
- **Hover** - при наведении
- **Expanded** - раскрытая секция

### Item

- **Standard** - обычное состояние
- **Hover** - при наведении
- **Active** - активный элемент (синий фон)

### Inner Item (Sub-item)

- **Standard** - обычное состояние
- **Hover** - при наведении
- **Active** - активный элемент (синий фон)

## 💡 Примеры

### Управление раскрытием секций

```jsx
const [expandedSections, setExpandedSections] = useState({
  "my-files": true,
  resources: false,
  "my-profile": false,
});

// Секции управляются внутри компонента
```

### Навигация с роутингом

```jsx
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <Sidebar
      onNavigate={(sectionId, itemId) => {
        if (itemId) {
          navigate(`/${sectionId}/${itemId}`);
        } else {
          navigate(`/${sectionId}`);
        }
      }}
    />
  );
}
```

### Сворачивание sidebar

```jsx
const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

<div style={{ display: "flex" }}>
  {!sidebarCollapsed && (
    <Sidebar onCollapse={() => setSidebarCollapsed(true)} />
  )}

  <MainContent />
</div>;
```

## 🎨 Кастомизация

### Изменение ширины

```css
.sidebar {
  width: 240px; /* Вместо 180px */
}
```

### Изменение высоты элементов

```css
.sidebar__item {
  height: 48px; /* Вместо 44px */
}

.sidebar__collapse {
  height: 64px; /* Вместо 58px */
}
```

### Добавление новой секции

```jsx
<div className="sidebar__section">
  <button
    className="sidebar__section-header"
    onClick={() => handleNavigate("new-section")}
  >
    <div className="sidebar__section-left">
      <div className="sidebar__section-icon">
        <YourIcon />
      </div>
      <p className="sidebar__section-title">New Section</p>
    </div>
  </button>
</div>
```

## 🎨 Иконки

Все иконки взяты из `favourite-folders/public/icons/side-bar/`:

- `collapse.svg` - стрелка назад
- `my-files.svg` - файл
- `my-profile.svg` - профиль
- `storage.svg` - хранилище
- `webgl-test.svg` - тест
- `resources.svg` - ресурсы

Иконки встроены в компонент как React компоненты для лучшей производительности.

## 📊 Размеры

- **Ширина sidebar**: 180px
- **Высота Collapse**: 58px
- **Высота Section Header**: 44px
- **Высота Item**: 44px
- **Высота Inner Item**: 36px (8px padding)
- **Размер иконки**: 16.667px × 16.667px
- **Размер иконки item**: 13.333px × 13.333px

## 🚀 Демо

Запустите демо-компонент:

```jsx
import SidebarDemo from "./components/Sidebar/SidebarDemo";

function App() {
  return <SidebarDemo />;
}
```

Демо включает:

- Интерактивный sidebar
- Отображение текущего состояния
- Список возможностей
- Используемые токены

## 🔧 Интеграция

1. Убедитесь, что импортирован `foundation-colors.css`:

```css
/* src/index.css */
@import "./styles/tokens/foundation-colors.css";
```

2. Импортируйте компонент:

```jsx
import Sidebar from "./components/Sidebar/Sidebar";
```

3. Используйте в приложении:

```jsx
<div style={{ display: "flex" }}>
  <Sidebar />
  <MainContent />
</div>
```

## 🎯 Особенности реализации

### Анимация раскрытия

```css
.sidebar__section-content {
  max-height: 0;
  transition: max-height 0.3s ease;
}

.sidebar__section-content.expanded {
  max-height: 500px;
}
```

### Стрелка dropdown

```css
.sidebar__section-arrow {
  transition: transform 0.2s ease;
}

.sidebar__section-arrow.expanded {
  transform: rotate(180deg);
}
```

### Белый бейдж для активной иконки

```css
.sidebar__item-icon.with-badge {
  background: white;
  border-radius: 90px;
  padding: 2px;
}
```

## 📝 TODO

- [ ] Анимация сворачивания sidebar
- [ ] Tooltips при свернутом состоянии
- [ ] Keyboard navigation
- [ ] Drag & Drop для переупорядочивания
- [ ] Контекстное меню
- [ ] Поиск по секциям
- [ ] Badges с количеством
- [ ] Настройка порядка секций
