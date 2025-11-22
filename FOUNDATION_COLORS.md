# Foundation Colors - Система цветов

## Обзор

Новая система цветов для темного интерфейса с файловым браузером. Использует четырехуровневую иерархию токенов.

## 🎨 Структура

```
Foundation (базовые цвета)
    ↓
Semantic (семантические цвета)
    ↓
Surface/Text/Border/States (контекстные токены)
    ↓
Components (токены компонентов)
```

## 📁 Уровни токенов

### Уровень 1: Foundation (Базовые цвета)

**Primary:**

- `--foundation-primary: #254CA8` - Основной акцентный цвет

**Gray Scale (12 оттенков):**

```css
--foundation-gray900: #141518  /* Самый темный */
--foundation-gray800: #1E2023
--foundation-gray700: #242629
--foundation-gray600: #2A2C2F
--foundation-gray500: #333538
--foundation-gray400: #47494D
--foundation-gray300: #5B5D62
--foundation-gray200: #787A80
--foundation-gray100: #A7A9AD
--foundation-gray50:  #DADBDE
--foundation-gray0:   #FFFFFF  /* Самый светлый */
```

### Уровень 2: Semantic (Семантические цвета)

```css
--semantic-success: #2ECC71  /* Успех, синхронизация */
--semantic-warning: #F1C40F  /* Предупреждение */
--semantic-error:   #E74C3C  /* Ошибка, удаление */
--semantic-info:    #3498DB  /* Информация, расшаривание */
```

### Уровень 3: Контекстные токены

#### Surface (Поверхности)

```css
--surface-page:    var(--foundation-gray900)  /* Фон страницы */
--surface-base:    var(--foundation-gray800)  /* Основной фон */
--surface-alt:     var(--foundation-gray700)  /* Альтернативный фон */
--surface-overlay: rgba(0, 0, 0, 0.4)         /* Оверлей */
```

#### Text (Текст)

```css
--text-primary:    var(--foundation-gray0)    /* Основной текст */
--text-secondary:  var(--foundation-gray200)  /* Вторичный текст */
--text-muted:      var(--foundation-gray300)  /* Приглушенный текст */
--text-inverse:    var(--foundation-gray900)  /* Инверсный текст */
--text-on-primary: var(--foundation-gray0)    /* Текст на primary */
```

#### Border (Границы)

```css
--border-default: var(--foundation-gray600)  /* Стандартная граница */
--border-strong:  var(--foundation-gray500)  /* Сильная граница */
--border-subtle:  var(--foundation-gray700)  /* Тонкая граница */
```

#### States (Состояния)

```css
--states-hover:         #2A2C2F                      /* Hover */
--states-active:        var(--foundation-gray500)    /* Active */
--states-selected:      var(--foundation-primary)    /* Selected */
--states-focus:         var(--foundation-primary)    /* Focus */
--states-disabled-bg:   var(--foundation-gray700)    /* Disabled фон */
--states-disabled-text: var(--foundation-gray400)    /* Disabled текст */
```

### Уровень 4: Components (Компоненты)

#### Sidebar

```css
--sidebar-background:        var(--foundation-gray900)
--sidebar-background-hover:  var(--foundation-gray800)
--sidebar-background-active: var(--foundation-primary)
--sidebar-text:              var(--foundation-gray50)
--sidebar-text-muted:        var(--foundation-gray300)
--sidebar-icon:              var(--foundation-gray300)
--sidebar-icon-active:       var(--foundation-primary)
--sidebar-border-right:      var(--border-default)
```

#### Header

```css
--header-background:          var(--foundation-gray800)
--header-background-elevated: var(--foundation-gray700)
--header-text:                var(--text-primary)
--header-text-secondary:      var(--text-secondary)
--header-icon:                var(--text-primary)
--header-border-bottom:       var(--border-default)
--header-button-bg:           var(--surface-alt)
--header-button-hover:        var(--states-hover)
--header-button-active:       var(--states-active)
--header-button-text:         var(--text-primary)
```

#### Browser (Файловый браузер)

```css
/* Фоны */
--browser-background:     var(--surface-base)
--browser-background-alt: var(--surface-alt)

/* Строки */
--browser-row-bg:       var(--surface-base)
--browser-row-hover:    var(--states-hover)
--browser-row-selected: var(--states-selected)

/* Текст */
--browser-text:           var(--text-primary)
--browser-text-secondary: var(--text-secondary)

/* Границы */
--browser-border-row:  var(--border-default)
--browser-border-grid: var(--border-default)

/* Статусы */
--browser-status-synced:  var(--semantic-success)
--browser-status-error:   var(--semantic-error)
--browser-status-warning: var(--semantic-warning)
--browser-status-info:    var(--semantic-info)
```

#### Activity (Панель активности)

```css
--activity-background:     var(--surface-base)
--activity-background-alt: var(--surface-alt)
--activity-text:           var(--text-primary)
--activity-text-secondary: var(--text-secondary)
--activity-border-left:    var(--border-default)
--activity-border-item:    var(--border-default)

/* События */
--activity-event-created: var(--semantic-success)
--activity-event-updated: var(--foundation-primary)
--activity-event-deleted: var(--semantic-error)
--activity-event-shared:  var(--semantic-info)
```

#### Button

```css
/* Primary Button */
--button-primary-bg:           var(--foundation-primary)
--button-primary-hover:        #305CBA
--button-primary-active:       #1C3F84
--button-primary-text:         var(--text-on-primary)
--button-primary-disabled-bg:  var(--foundation-gray700)
--button-primary-disabled-text: var(--foundation-gray400)

/* Secondary Button */
--button-secondary-bg:     var(--surface-alt)
--button-secondary-border: var(--border-default)
--button-secondary-text:   var(--text-primary)
--button-secondary-hover:  var(--states-hover)
--button-secondary-active: var(--states-active)
```

#### Panel

```css
--panel-background:   var(--surface-base)
--panel-border:       var(--border-default)
--panel-header-bg:    var(--surface-alt)
--panel-header-text:  var(--text-primary)
```

## 💡 Примеры использования

### Sidebar

```css
.sidebar {
  background: var(--sidebar-background);
  border-right: 1px solid var(--sidebar-border-right);
  color: var(--sidebar-text);
}

.sidebar-item:hover {
  background: var(--sidebar-background-hover);
}

.sidebar-item.active {
  background: var(--sidebar-background-active);
  color: var(--text-on-primary);
}
```

### Browser Row

```css
.browser-row {
  background: var(--browser-row-bg);
  color: var(--browser-text);
  border-bottom: 1px solid var(--browser-border-row);
}

.browser-row:hover {
  background: var(--browser-row-hover);
}

.browser-row.selected {
  background: var(--browser-row-selected);
  color: var(--text-on-primary);
}
```

### Status Badge

```css
.status-badge.synced {
  background: var(--browser-status-synced);
}

.status-badge.error {
  background: var(--browser-status-error);
}
```

### Button

```css
.button-primary {
  background: var(--button-primary-bg);
  color: var(--button-primary-text);
}

.button-primary:hover {
  background: var(--button-primary-hover);
}

.button-primary:active {
  background: var(--button-primary-active);
}

.button-primary:disabled {
  background: var(--button-primary-disabled-bg);
  color: var(--button-primary-disabled-text);
}
```

## 🎯 Преимущества

1. **Четкая иерархия** - от базовых цветов к компонентам
2. **Переиспользование** - компоненты ссылаются на контекстные токены
3. **Консистентность** - единая цветовая схема
4. **Гибкость** - легко изменить базовые цвета
5. **Семантика** - понятные названия переменных

## 📊 Статистика

- **Foundation цветов**: 13 (primary + 12 gray)
- **Semantic цветов**: 4
- **Surface токенов**: 4
- **Text токенов**: 5
- **Border токенов**: 3
- **States токенов**: 6
- **Component токенов**: 60+
- **Всего переменных**: ~95

## 🔧 Интеграция

Добавьте в `src/index.css`:

```css
@import "./styles/tokens/foundation-colors.css";
```

Или используйте вместе с существующими токенами:

```css
/* Порядок импорта */
@import "./styles/tokens/global-palette.css"; /* Старые палитры */
@import "./styles/tokens/foundation-colors.css"; /* Новые foundation цвета */
@import "./styles/tokens/global-tokens.css"; /* Глобальные токены */
```

## 🎨 Цветовая палитра

### Gray Scale визуализация

```
gray900 ████ #141518 (page background)
gray800 ████ #1E2023 (base surface)
gray700 ████ #242629 (alt surface)
gray600 ████ #2A2C2F (borders)
gray500 ████ #333538 (strong borders)
gray400 ████ #47494D (disabled text)
gray300 ████ #5B5D62 (muted text, icons)
gray200 ████ #787A80 (secondary text)
gray100 ████ #A7A9AD
gray50  ████ #DADBDE (sidebar text)
gray0   ████ #FFFFFF (primary text)
```

### Semantic Colors

```
Primary ████ #254CA8 (accent, selected)
Success ████ #2ECC71 (synced, created)
Warning ████ #F1C40F (warnings)
Error   ████ #E74C3C (errors, deleted)
Info    ████ #3498DB (info, shared)
```
