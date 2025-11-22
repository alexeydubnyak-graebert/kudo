# Разделители для групп в dropdown

## Атрибуты группы

Группа `<group>` поддерживает три атрибута для управления разделителями:

### 1. `dividers` (boolean)
Добавляет разделители **сверху и снизу** группы:
```xml
<group dividers="true">
  <item id="item1" label="Item 1" icon-light="..." icon-dark="..." />
  <item id="item2" label="Item 2" icon-light="..." icon-dark="..." />
</group>
```

### 2. `divider-top` (boolean)
Добавляет разделитель **только сверху** группы:
```xml
<group divider-top="true">
  <item id="item1" label="Item 1" icon-light="..." icon-dark="..." />
  <item id="item2" label="Item 2" icon-light="..." icon-dark="..." />
</group>
```

### 3. `divider-bottom` (boolean)
Добавляет разделитель **только снизу** группы:
```xml
<group divider-bottom="true">
  <item id="item1" label="Item 1" icon-light="..." icon-dark="..." />
  <item id="item2" label="Item 2" icon-light="..." icon-dark="..." />
</group>
```

## Примеры использования

### Пример 1: Группы с разными разделителями

```xml
<splitButton 
  id="rectangle" 
  label="Rectangle"
  icon-light="/Users/username/.../light/draw/rectangle.svg"
  icon-dark="/Users/username/.../dark/draw/rectangle.svg"
>
  <dropdown>
    <!-- Первая группа: разделители сверху и снизу -->
    <group dividers="true">
      <item 
        id="corner" 
        label="Corner"
        icon-light="/Users/username/.../light/draw/rectangle.svg"
        icon-dark="/Users/username/.../dark/draw/rectangle.svg"
      />
      <item 
        id="center" 
        label="Center"
        icon-light="/Users/username/.../light/draw/rectangle_center.svg"
        icon-dark="/Users/username/.../dark/draw/rectangle_center.svg"
      />
    </group>
    
    <!-- Вторая группа: только разделитель снизу -->
    <group divider-bottom="true">
      <item 
        id="3point" 
        label="3 Point Corner"
        icon-light="/Users/username/.../light/draw/rectangle_three_corner.svg"
        icon-dark="/Users/username/.../dark/draw/rectangle_three_corner.svg"
      />
    </group>
  </dropdown>
</splitButton>
```

### Пример 2: Комбинация групп и отдельных элементов

```xml
<splitButton id="line" label="Line" icon-light="..." icon-dark="...">
  <dropdown>
    <!-- Отдельный элемент без группы -->
    <item id="line" label="Line" icon-light="..." icon-dark="..." />
    
    <!-- Группа с разделителем сверху -->
    <group divider-top="true">
      <item id="infiniteLine" label="Infinite Line" icon-light="..." icon-dark="..." />
      <item id="ray" label="Ray" icon-light="..." icon-dark="..." />
    </group>
    
    <!-- Отдельный элемент -->
    <item id="richLine" label="RichLine" icon-light="..." icon-dark="..." />
  </dropdown>
</splitButton>
```

### Пример 3: Несколько групп подряд

```xml
<splitButton id="tools" label="Tools" icon-light="..." icon-dark="...">
  <dropdown>
    <!-- Группа 1: разделитель снизу -->
    <group divider-bottom="true">
      <item id="tool1" label="Tool 1" icon-light="..." icon-dark="..." />
      <item id="tool2" label="Tool 2" icon-light="..." icon-dark="..." />
    </group>
    
    <!-- Группа 2: разделитель снизу -->
    <group divider-bottom="true">
      <item id="tool3" label="Tool 3" icon-light="..." icon-dark="..." />
      <item id="tool4" label="Tool 4" icon-light="..." icon-dark="..." />
    </group>
    
    <!-- Группа 3: без разделителей -->
    <group>
      <item id="tool5" label="Tool 5" icon-light="..." icon-dark="..." />
    </group>
  </dropdown>
</splitButton>
```

## Приоритет атрибутов

Если указаны несколько атрибутов одновременно:
- `dividers="true"` + `divider-top="true"` → разделитель сверху будет показан
- `dividers="true"` + `divider-bottom="true"` → разделитель снизу будет показан
- Все три атрибута → разделители сверху и снизу

## Визуальное представление

```
┌─────────────────────┐
│ Item 1              │
│ Item 2              │  ← Группа без разделителей
│ Item 3              │
├─────────────────────┤  ← divider-top="true"
│ Item 4              │
│ Item 5              │
├─────────────────────┤  ← divider-bottom="true"
│ Item 6              │
└─────────────────────┘
```

## Стилизация

Разделители используют класс `.dynamic-split-button__divider` из `DynamicSplitButton.css`.

Текущие стили:
```css
.dynamic-split-button__divider {
  height: 1px;
  background-color: var(--color-border);
  margin: 4px 0;
}
```
