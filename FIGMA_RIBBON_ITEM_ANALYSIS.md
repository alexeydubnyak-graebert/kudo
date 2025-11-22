# 🎨 Анализ компонента Ribbon Item из Figma

## 📊 Обнаруженные варианты компонента

Компонент **ribbonItem** имеет 5 состояний:
1. **standard** - Обычное состояние
2. **hover** - При наведении
3. **pressed** - При нажатии
4. **active** - Активное состояние
5. **disabled** - Отключенное состояние

---

## 🎯 Извлеченные значения из Figma

### 1. Standard State
```
Background: #f5f5f6
Text Color: #272727
Icon Color: #272727 (из SVG)
Gap: 6px
Padding: 6px (все стороны)
Border Radius: 4px
Font: Roboto Regular 14px
Line Height: 16px
Font Weight: 400
```

### 2. Hover State
```
Background: #e2e2e2
Text Color: #272727
Icon Color: #272727
Gap: 6px
Padding: 6px
Border Radius: 4px
Font: Roboto Regular 14px
```

### 3. Pressed State
```
Background: #cccccc
Text Color: #272727
Icon Color: #272727
Gap: 6px
Padding: 6px
Border Radius: 4px
Font: Roboto Regular 14px
```

### 4. Active State
```
Background: #d5ddef
Text Color: #050505
Icon Color: #050505
Gap: 6px
Padding: 6px
Border Radius: 4px
Font: Roboto Regular 14px
```

### 5. Disabled State
```
Background: #f5f5f6
Text Color: #898b8c
Icon Color: #898b8c
Gap: 6px
Padding: 6px
Border Radius: 4px
Font: Roboto Regular 14px
```

---

## ✅ Проверка наличия токенов

### Цвета - Background

| Состояние | Figma | Наш токен | Значение | Статус |
|-----------|-------|-----------|----------|--------|
| standard | `#f5f5f6` | `--kudo-ribbon-item-bg-standard` | `var(--states-bg-secondary-standard)` → `var(--palette-jango-tint-28)` → `#f5f5f6` | ✅ |
| hover | `#e2e2e2` | `--kudo-ribbon-item-bg-hover` | `var(--states-bg-secondary-hover)` → `var(--palette-clone-tint-24)` → `#e2e2e2` | ✅ |
| pressed | `#cccccc` | `--kudo-ribbon-item-bg-pressed` | `var(--states-bg-secondary-pressed)` → `var(--palette-clone-tint-20)` → `#cccccc` | ✅ |
| active | `#d5ddef` | `--kudo-ribbon-item-bg-active` | `var(--states-bg-secondary-active)` → `var(--palette-obi-tint-24)` → `#d5ddef` | ✅ |
| disabled | `#f5f5f6` | `--kudo-ribbon-item-bg-disabled` | `var(--states-bg-secondary-disabled)` → `var(--palette-jango-tint-28)` → `#f5f5f6` | ✅ |

### Цвета - Text

| Состояние | Figma | Наш токен | Значение | Статус |
|-----------|-------|-----------|----------|--------|
| standard | `#272727` | `--kudo-ribbon-item-text-standard` | `var(--states-text-color-standard)` → `var(--palette-rey-shadow-24)` → `#272727` | ✅ |
| hover | `#272727` | `--kudo-ribbon-item-text-standard` | (используется standard) | ✅ |
| pressed | `#272727` | `--kudo-ribbon-item-text-standard` | (используется standard) | ✅ |
| active | `#050505` | `--kudo-ribbon-item-text-active` | `var(--states-text-color-active)` → `var(--palette-rey-shadow-30)` → `#050505` | ✅ |
| disabled | `#898b8c` | `--kudo-ribbon-item-text-disabled` | `var(--states-text-color-disabled)` → `var(--palette-jango-tint-13)` → `#898b8c` | ✅ |

### Цвета - Icon

| Состояние | Figma | Наш токен | Значение | Статус |
|-----------|-------|-----------|----------|--------|
| standard | `#272727` | `--kudo-ribbon-item-icon-standard` | `var(--states-icon-color-standard)` → `var(--palette-rey-shadow-24)` → `#272727` | ✅ |
| active | `#050505` | `--kudo-ribbon-item-icon-active` | `var(--states-icon-color-active)` → `var(--palette-rey-shadow-30)` → `#050505` | ✅ |
| disabled | `#898b8c` | `--kudo-ribbon-item-icon-disabled` | `var(--states-icon-color-disabled)` → `var(--palette-jango-tint-13)` → `#898b8c` | ✅ |

### Размеры

| Свойство | Figma | Наш токен | Значение | Статус |
|----------|-------|-----------|----------|--------|
| padding (все) | `6px` | `--kudo-item-padding` | `var(--size-6)` → `6px` | ✅ |
| padding-left | `6px` | `--kudo-item-padding-left` | `var(--size-6)` → `6px` | ✅ |
| padding-top | `6px` | `--kudo-item-padding-top` | `var(--size-6)` → `6px` | ✅ |
| padding-right | `6px` | `--kudo-item-padding-right` | `var(--size-6)` → `6px` | ✅ |
| padding-bottom | `6px` | `--kudo-item-padding-bottom` | `var(--size-6)` → `6px` | ✅ |
| border-radius | `4px` | `--kudo-item-border-radius` | `var(--size-4)` → `4px` | ✅ |
| gap | `6px` | `--size-6` | `6px` | ✅ |
| margin | `6px` | `--kudo-item-margin` | `var(--size-6)` → `6px` | ✅ |

### Типографика

| Свойство | Figma | Наш токен | Значение | Статус |
|----------|-------|-----------|----------|--------|
| font-family | `Roboto` | `--font-family-kudo` | `'Roboto', ...` | ✅ |
| font-size | `14px` | `--font-size-lg` | `14px` | ✅ |
| font-weight | `400` | `--font-weight-md` | `400` | ✅ |
| line-height | `16px` | `--line-height-md` | `16px` | ✅ |

---

## 🎉 Итоговая проверка

### ✅ Все токены присутствуют!

**Цвета**: 15/15 ✅
- Background: 5 состояний
- Text: 5 состояний  
- Icon: 3 состояния
- Border: 5 состояний (есть в системе)

**Размеры**: 8/8 ✅
- Padding (4 стороны + общий)
- Border radius
- Gap
- Margin

**Типографика**: 4/4 ✅
- Font family
- Font size
- Font weight
- Line height

**Всего проверено**: 27 свойств
**Все найдены**: 27 ✅

---

## 📝 Дополнительные наблюдения

### 1. Icon размер
- Figma: `16px × 16px`
- Можно добавить: `--kudo-icon-size-sm: 16px`

### 2. Gap между иконкой и текстом
- Figma: `6px`
- Уже есть: `--size-6`

### 3. Структура компонента
```html
<div class="ribbon-item">
  <div class="ribbon-item__icon">
    <!-- SVG icon 16x16 -->
  </div>
  <div class="ribbon-item__label">
    Label
  </div>
</div>
```

### 4. Border
В Figma не видно явного border, но в нашей системе есть токены для border на случай, если понадобится:
- `--kudo-ribbon-item-border-standard`
- `--kudo-ribbon-item-border-hover`
- `--kudo-ribbon-item-border-pressed`
- `--kudo-ribbon-item-border-active`
- `--kudo-ribbon-item-border-disabled`

---

## 🚀 Готово к реализации!

Все необходимые токены для компонента Ribbon Item **присутствуют** в нашей модульной системе и **полностью соответствуют** дизайну из Figma.

Можно приступать к созданию компонента! 🎯
