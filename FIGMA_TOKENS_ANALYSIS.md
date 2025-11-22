# 🎨 Анализ токенов из Figma

## Компонент: Select Line (Ribbon Item)

### Переменные из Figma дизайна

#### ✅ Цвета (есть в tokens.css)

- `kudo/colors/ribbon-item/icon-color/item/standard: #cfcfcf` → `--states-icon-color-standard` (темная тема)
- `kudo/colors/ribbon-item/text-color/standard: #cfcfcf` → `--states-text-color-standard` (темная тема)
- `kudo/colors/ribbon-item/background/standard: #333538` → `--states-bg-secondary-standard` (темная тема)

#### ⚠️ Цвета (частично есть, нужно уточнить)

- `kudo/colors/ribbon-item/background/active: #010101`

  - В tokens.json: `#d5e8f2` (light) / `#a6b7de` (dark)
  - В Figma: `#010101` (почти черный)
  - **Несоответствие!** Нужно проверить актуальность

- `kudo/colors/dropdown-menu/border: #010101`
  - Сейчас используем: `--states-border-secondary-standard`
  - **Может потребоваться специфичный цвет**

#### ✅ Акцентный цвет (добавлен)

- `dark/primary/main: #ef7c28` → `--accent-primary`

#### ✅ Размеры (добавлены)

- `kudo/dimensions/item/margin: 6` → `--kudo-item-margin: 6px`
- `kudo/dimensions/item/padding/left: 6` → `--kudo-item-padding-left: 6px`
- `kudo/dimensions/item/padding/top: 6` → `--kudo-item-padding-top: 6px`
- `kudo/dimensions/item/padding/right: 6` → `--kudo-item-padding-right: 6px`
- `kudo/dimensions/item/padding/bottom: 6` → `--kudo-item-padding-bottom: 6px`
- `kudo/dimensions/item/borderRadius: 4` → `--kudo-item-border-radius: 4px`

#### ✅ Типографика (добавлена)

- `typography/font size/fontSizeLG: 14` → `--kudo-font-size-lg: 14px`
- `font family/fontFamilykudo: Roboto` → `--kudo-font-family: 'Roboto', ...`
- `typography/font weight/fontWeightMD: 400` → `--kudo-font-weight-md: 400`
- `ribbon/item: Font(...)` → комбинация переменных выше

## 📊 Сводка

### Добавлено в tokens.css:

```css
/* Акцентный цвет */
--accent-primary: #ef7c28;

/* Размеры kudo */
--kudo-item-margin: 6px;
--kudo-item-padding: 6px;
--kudo-item-padding-left: 6px;
--kudo-item-padding-top: 6px;
--kudo-item-padding-right: 6px;
--kudo-item-padding-bottom: 6px;
--kudo-item-border-radius: 4px;

/* Типографика kudo */
--kudo-font-family: "Roboto", ...;
--kudo-font-size-base: 14px;
--kudo-font-size-lg: 14px;
--kudo-font-weight-regular: 400;
--kudo-font-weight-md: 400;
--kudo-font-weight-medium: 500;
--kudo-font-weight-bold: 600;
--kudo-line-height-base: 1;
--kudo-line-height-normal: 1.5;

/* Dropdown Menu */
--kudo-dropdown-border: var(--states-border-secondary-standard);
--kudo-dropdown-bg: var(--states-bg-secondary-standard);
```

### ⚠️ Требует внимания:

1. **Active состояние ribbon-item**

   - Figma показывает: `#010101` (черный)
   - tokens.json содержит: `#d5e8f2` / `#a6b7de` (голубой)
   - Текущая реализация: использует `var(--states-bg-primary-hover)`

   **Рекомендация**: Проверить с дизайнером актуальные значения

2. **Dropdown menu border**

   - Figma: `#010101` (черный)
   - Сейчас: `var(--states-border-secondary-standard)` (#bcbcbd светлая, #505254 темная)

   **Рекомендация**: Возможно нужен специфичный темный border для dropdown

## 🎯 Готовность к реализации

### ✅ Готово:

- Все размеры определены
- Типографика настроена
- Базовые цвета есть
- Акцентный цвет добавлен

### 🔄 Можно начинать создавать компонент:

Все необходимые переменные для создания Select Line (Ribbon Item) компонента **присутствуют**.

Можно использовать:

```css
.ribbon-item {
  padding: var(--kudo-item-padding);
  margin: var(--kudo-item-margin);
  border-radius: var(--kudo-item-border-radius);
  font-family: var(--kudo-font-family);
  font-size: var(--kudo-font-size-base);
  font-weight: var(--kudo-font-weight-regular);

  background-color: var(--kudo-ribbon-item-bg-standard);
  color: var(--kudo-ribbon-item-text-standard);
  border: 1px solid var(--kudo-ribbon-item-border-standard);
}

.ribbon-item:hover {
  background-color: var(--kudo-ribbon-item-bg-hover);
}

.ribbon-item.active {
  background-color: var(--kudo-ribbon-item-bg-active);
  color: var(--kudo-ribbon-item-text-active);
}

.ribbon-item .icon {
  color: var(--kudo-ribbon-item-icon-standard);
}

.ribbon-item.active .icon {
  color: var(--kudo-ribbon-item-icon-active);
}
```

## 📝 Следующие шаги

1. ✅ Создать компонент RibbonItem / SelectLine
2. ⚠️ Уточнить у дизайнера цвет активного состояния (#010101 vs #d5e8f2)
3. ✅ Использовать все добавленные переменные
4. ✅ Протестировать в обеих темах
