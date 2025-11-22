# SplitArrow Component

Компонент кнопки со стрелкой для раскрывающихся меню в интерфейсе ARES kudo, созданный на основе дизайна из Figma.

## 🎯 Особенности

- ✅ **5 состояний**: standard, hover, pressed, active, disabled
- ✅ **4 размера**: sm (28px), md (36px), lg (44px), xlg (60px)
- ✅ **Полное соответствие Figma**: все размеры и цвета из дизайна
- ✅ **Модульные токены**: использует трехуровневую систему токенов
- ✅ **Темная тема**: автоматическая поддержка через токены
- ✅ **Доступность**: ARIA атрибуты, keyboard navigation
- ✅ **Split button**: работает в паре с RibbonItem

## 📦 Использование

### Базовый пример

```jsx
import SplitArrow from "./components/SplitArrow";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return <SplitArrow active={isOpen} onClick={() => setIsOpen(!isOpen)} />;
}
```

### Split Button (кнопка + стрелка)

```jsx
import RibbonItem from "./components/RibbonItem";
import SplitArrow from "./components/SplitArrow";

function SplitButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      <RibbonItem
        icon={<Icon />}
        label="Действие"
        onClick={() => console.log("Main action")}
      />
      <SplitArrow active={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </div>
  );
}
```

### Разные размеры

```jsx
<SplitArrow size="sm" />   {/* 16×28px */}
<SplitArrow size="md" />   {/* 20×36px */}
<SplitArrow size="lg" />   {/* 20×44px */}
<SplitArrow size="xlg" />  {/* 16×60px */}
```

### Отключенное состояние

```jsx
<SplitArrow disabled={true} />
```

## 🎨 Props

| Prop        | Type                            | Default | Описание                          |
| ----------- | ------------------------------- | ------- | --------------------------------- |
| `active`    | `bool`                          | `false` | Активное состояние (меню открыто) |
| `disabled`  | `bool`                          | `false` | Отключенное состояние             |
| `onClick`   | `func`                          | -       | Обработчик клика                  |
| `className` | `string`                        | `''`    | Дополнительные CSS классы         |
| `size`      | `'sm' \| 'md' \| 'lg' \| 'xlg'` | `'sm'`  | Размер кнопки                     |

## 🎨 Используемые токены

### Цвета

```css
/* Backgrounds */
--kudo-split-arrow-bg-standard: #f5f5f6
--kudo-split-arrow-bg-hover: #e2e2e2
--kudo-split-arrow-bg-pressed: #cccccc
--kudo-split-arrow-bg-active: #d5ddef
--kudo-split-arrow-bg-disabled: #f5f5f6

/* Icons */
--kudo-split-arrow-icon-standard: #272727
--kudo-split-arrow-icon-active: #050505
--kudo-split-arrow-icon-disabled: #898b8c

/* Borders */
--kudo-split-arrow-border-standard: #f5f5f6
```

### Размеры

```css
--kudo-split-arrow-padding-top: 6px
--kudo-split-arrow-padding-bottom: 6px
--kudo-split-arrow-padding-left: 0px
--kudo-split-arrow-padding-right: 0px
--kudo-split-arrow-border-radius: 4px
--kudo-split-arrow-margin: 6px
```

### Размеры по size

| Size  | Width | Height |
| ----- | ----- | ------ |
| `sm`  | 16px  | 28px   |
| `md`  | 20px  | 36px   |
| `lg`  | 20px  | 44px   |
| `xlg` | 16px  | 60px   |

## 🔄 Цепочка переиспользования токенов

```
--kudo-split-arrow-bg-standard
  ↓ ссылается на
--states-bg-secondary-standard
  ↓ ссылается на
--palette-jango-tint-28
  ↓ равен
#f5f5f6
```

В темной теме автоматически меняется благодаря переопределению глобальных токенов.

## ♿ Доступность

- **ARIA атрибуты**: `aria-expanded`, `aria-disabled`, `aria-label`
- **Keyboard navigation**: Enter и Space для активации
- **Focus visible**: видимый outline при фокусе с клавиатуры
- **Semantic HTML**: использует `<button>` элемент

## 🎭 Состояния

### Standard

Обычное состояние по умолчанию

### Hover

Появляется при наведении курсора (`:hover`)

### Pressed

Появляется при нажатии (`:active`)

### Active

Меню открыто (prop `active={true}`)

### Disabled

Отключенное состояние (prop `disabled={true}`)

## 🎨 Особенности дизайна

- **Скругление только справа**: `border-top-right-radius` и `border-bottom-right-radius`
- **Иконка**: стрелка вниз (chevron down) 16×16px
- **Padding**: только сверху и снизу (left/right = 0)
- **Центрирование**: иконка всегда по центру

## 🔗 Split Button паттерн

Компонент предназначен для использования в паре с `RibbonItem`:

```css
.split-button-group {
  display: flex;
  gap: 0;
}

.split-button-group .ribbon-item {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.split-button-group .split-arrow {
  border-left: 1px solid var(--divider);
}
```

## 🌙 Темная тема

Все цвета автоматически меняются при переключении темы:

```javascript
document.documentElement.setAttribute("data-theme", "dark");
```

Не требуется дополнительных стилей - всё работает через систему токенов!

## 📝 Примечания

- Компонент создан на основе дизайна из Figma (node-id: 5101:6299-6330)
- Все значения полностью соответствуют дизайну
- Использует модульную систему токенов с трехуровневой иерархией
- Поддерживает все интерактивные состояния из дизайна
- Включает SVG иконку стрелки (`ChevronDownIcon`)

## 🚀 Демо

Запустите приложение и перейдите на главную страницу, чтобы увидеть все варианты компонента в действии.

```bash
npm run dev
```

Откройте http://localhost:5173
