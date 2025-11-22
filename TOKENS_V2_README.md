# 🎨 Система токенов V2

## Обновленная архитектура

Система токенов полностью переработана для использования полной структуры из вашего JSON файла.

### 📁 Структура файлов

```
kudo/
├── tokens-full.json              # Источник истины - полная структура токенов
├── create-tokens-full.js         # Скрипт для создания tokens-full.json
├── scripts/
│   ├── generate-tokens-v2.js     # Новый генератор CSS из JSON
│   └── generate-tokens.js        # Старый генератор (deprecated)
└── src/styles/
    ├── tokens-generated.css      # ✅ Автогенерированные токены
    ├── tokens.css                # Старый файл (deprecated)
    └── base.css                  # Базовые стили
```

### 🎯 Коллекции токенов

#### 1. **global-color-tokens** (Глобальные цвета)

- **light** - Светлая тема
- **dark** - Темная тема

Включает:

- `states` - Состояния (background, text-color, icon-color, border, highlight)
- `text-color` - Цвета текста
- `divider` - Разделители
- `background` - Фоны

#### 2. **global-dimensions** (Глобальные размеры)

- `size.base` - Базовые размеры от 2px до 30px

#### 3. **global-typography** (Глобальная типографика)

- `font-family` - Семейства шрифтов (Commander, kudo)
- `font-size` - Размеры шрифтов (sm, md, lg, xl, headings)
- `font-weight` - Толщина шрифтов
- `line-height` - Высота строк
- `letter-spacing` - Межбуквенное расстояние

#### 4. **ares-kudo** (Токены бренда kudo)

- **light** - Светлая тема
  - `colors` - Цвета компонентов
  - `dimensions` - Размеры компонентов
- **dark** - Темная тема

#### 5. **ares-commander** (Токены бренда Commander)

- **light** - Светлая тема
- **dark** - Темная тема

### 🚀 Использование

#### Генерация токенов

```bash
# Сгенерировать CSS из tokens-full.json
npm run generate:tokens

# Следить за изменениями и автоматически регенерировать
npm run tokens:watch

# Пересоздать tokens-full.json из кода
npm run create:tokens
```

#### В CSS

```css
/* Глобальные токены */
.element {
  color: var(--states-text-color-standard);
  background: var(--states-bg-primary-standard);
  border: 1px solid var(--states-border-secondary-standard);
}

/* Токены kudo */
.kudo-button {
  padding: var(--kudo-item-padding-top) var(--kudo-item-padding-right);
  border-radius: var(--kudo-item-border-radius);
  background: var(--kudo-ribbon-item-background-standard);
  color: var(--kudo-ribbon-item-text-color-standard);
}

.kudo-button:hover {
  background: var(--kudo-ribbon-item-background-hover);
}

.kudo-button.active {
  background: var(--kudo-ribbon-item-background-active);
  color: var(--kudo-ribbon-item-text-color-active);
}

/* Типографика */
.text {
  font-family: var(--font-family-kudo);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-md);
  line-height: var(--line-height-md);
}

/* Размеры */
.spacing {
  margin: var(--size-6);
  padding: var(--size-12);
}
```

### 📊 Именование переменных

#### Глобальные токены

```
--states-{category}-{subcategory}-{state}
--states-bg-primary-standard
--states-text-color-active
--states-border-secondary-hover
```

#### Токены брендов

```
--{brand}-{component}-{property}-{state}
--kudo-ribbon-item-background-standard
--kudo-tooltip-text-color
--kudo-dropdown-menu-border
```

#### Размеры

```
--size-{number}
--size-6    # 6px
--size-12   # 12px
--size-24   # 24px
```

#### Типографика

```
--font-family-{brand}
--font-size-{size}
--font-weight-{weight}
--line-height-{size}
--letter-spacing-{size}
```

### 🎨 Примеры компонентов

#### Ribbon Item (Select Line)

```css
.ribbon-item {
  /* Размеры из токенов */
  margin: var(--kudo-item-margin);
  padding: var(--kudo-item-padding-top) var(--kudo-item-padding-right) var(
      --kudo-item-padding-bottom
    ) var(--kudo-item-padding-left);
  border-radius: var(--kudo-item-border-radius);

  /* Цвета из токенов */
  background: var(--kudo-ribbon-item-background-standard);
  color: var(--kudo-ribbon-item-text-color-standard);
  border: 1px solid var(--kudo-ribbon-item-border-standard);

  /* Типографика */
  font-family: var(--font-family-kudo);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-md);
}

.ribbon-item:hover {
  background: var(--kudo-ribbon-item-background-hover);
  border-color: var(--kudo-ribbon-item-border-hover);
}

.ribbon-item.active {
  background: var(--kudo-ribbon-item-background-active);
  color: var(--kudo-ribbon-item-text-color-active);
  border-color: var(--kudo-ribbon-item-border-active);
}

.ribbon-item .icon {
  color: var(--kudo-ribbon-item-icon-color-item-standard);
}

.ribbon-item.active .icon {
  color: var(--kudo-ribbon-item-icon-color-item-active);
}
```

#### Dropdown Menu

```css
.dropdown-menu {
  background: var(--kudo-ribbon-background-main);
  border: 1px solid var(--kudo-dropdown-menu-border);
  border-radius: var(--kudo-item-border-radius);
}

/* В темной теме автоматически меняется на #010101 */
:root[data-theme="dark"] .dropdown-menu {
  border-color: var(--kudo-dropdown-menu-border); /* #010101 */
}
```

### 🔄 Переключение темы

```javascript
// Переключить на темную тему
document.documentElement.setAttribute("data-theme", "dark");

// Переключить на светлую тему
document.documentElement.setAttribute("data-theme", "light");

// Или удалить атрибут для светлой темы по умолчанию
document.documentElement.removeAttribute("data-theme");
```

### ✅ Преимущества новой системы

1. **Единый источник истины** - `tokens-full.json`
2. **Автоматическая генерация** - CSS создается из JSON
3. **Полная структура** - Все коллекции токенов включены
4. **Типографика** - Полная поддержка шрифтов
5. **Размеры** - Глобальная система размеров
6. **Мультибрендовость** - Поддержка kudo и Commander
7. **Темизация** - Автоматическая поддержка light/dark тем

### 📝 Добавление новых токенов

1. Отредактируйте `create-tokens-full.js`
2. Добавьте новые токены в структуру
3. Запустите `npm run create:tokens`
4. Запустите `npm run generate:tokens`
5. Новые CSS переменные появятся в `tokens-generated.css`

### 🎯 Миграция со старой системы

Старые переменные (`tokens.css`) все еще доступны, но рекомендуется перейти на новые:

| Старое                        | Новое                                    |
| ----------------------------- | ---------------------------------------- |
| `--kudo-button-bg-standard`   | `--kudo-ribbon-item-background-standard` |
| `--kudo-button-text-standard` | `--kudo-ribbon-item-text-color-standard` |
| `--kudo-item-padding`         | `--kudo-item-padding-top`, etc.          |

### 📊 Статистика

- **Глобальных цветовых токенов**: ~60
- **Размеров**: 15 (2px - 30px)
- **Типографических токенов**: ~20
- **Токенов kudo**: ~30
- **Всего переменных**: ~150+

### 🔍 Отладка

```javascript
// Проверить значение токена
const root = document.documentElement;
const styles = getComputedStyle(root);
console.log(styles.getPropertyValue("--kudo-ribbon-item-background-standard"));

// Изменить токен динамически
root.style.setProperty(
  "--kudo-ribbon-item-background-standard",
  "#custom-color"
);
```

## 🚀 Готово к использованию!

Система полностью настроена и готова к созданию компонентов с правильными токенами из вашего JSON файла.
