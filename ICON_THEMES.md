# Поддержка тем для иконок

## Проблема

Одна и та же иконка для светлой и темной темы может иметь разные названия файлов или находиться в разных местах репозитория.

## Решение

Система поддерживает три способа указания путей к иконкам в XML:

### 1. Один путь для обеих тем

Используйте атрибут `icon`, если иконка одинаковая для обеих тем:

```xml
<ribbonItem 
  id="line" 
  label="Line" 
  icon="/Users/username/Documents/GitHub/application-icons/.../Line.svg" 
/>
```

### 2. Разные пути для светлой и темной темы

Используйте атрибуты `icon-light` и `icon-dark`:

```xml
<ribbonItem 
  id="line" 
  label="Line" 
  icon-light="/Users/username/Documents/GitHub/application-icons/.../light/Line.svg"
  icon-dark="/Users/username/Documents/GitHub/application-icons/.../dark/LineDark.svg"
/>
```

### 3. Комбинированный подход

Можно указать `icon` как fallback и переопределить для конкретной темы:

```xml
<ribbonItem 
  id="line" 
  label="Line" 
  icon="/Users/username/Documents/GitHub/application-icons/.../Line.svg"
  icon-dark="/Users/username/Documents/GitHub/application-icons/.../LineDark.svg"
/>
```

В этом случае:
- Для темной темы используется `icon-dark`
- Для светлой темы используется `icon` (fallback)

## Примеры использования

### SplitButton с разными иконками для тем

```xml
<splitButton 
  id="line" 
  label="Line" 
  icon-light="/Users/username/.../light/draw/Line.svg"
  icon-dark="/Users/username/.../dark/draw/Line.svg"
>
  <dropdown>
    <item 
      id="line" 
      label="Line" 
      icon-light="/Users/username/.../light/draw/Line.svg"
      icon-dark="/Users/username/.../dark/draw/Line.svg"
    />
    <item 
      id="ray" 
      label="Ray" 
      icon="/Users/username/.../draw/ray.svg"
    />
  </dropdown>
</splitButton>
```

### Dropdown элементы с разными путями

```xml
<splitButton id="tools" label="Tools" icon="...">
  <dropdown>
    <!-- Элемент с разными путями -->
    <item 
      id="tool1" 
      label="Tool 1" 
      icon-light="/path/to/light/tool1.svg"
      icon-dark="/path/to/dark/tool1_dark.svg"
    />
    
    <!-- Элемент с одним путем -->
    <item 
      id="tool2" 
      label="Tool 2" 
      icon="/path/to/tool2.svg"
    />
    
    <group dividers="true">
      <!-- Группа с разными путями -->
      <item 
        id="tool3" 
        label="Tool 3" 
        icon-light="/path/to/light/tool3.svg"
        icon-dark="/path/to/dark/tool3_dark.svg"
      />
    </group>
  </dropdown>
</splitButton>
```

## Приоритет атрибутов

Система выбирает путь в следующем порядке:

1. **Для темной темы**:
   - Если указан `icon-dark` → используется `icon-dark`
   - Иначе используется `icon`

2. **Для светлой темы**:
   - Если указан `icon-light` → используется `icon-light`
   - Иначе используется `icon`

## Скрипт обновления путей

Скрипт `npm run update-paths` автоматически обновляет имя пользователя во всех атрибутах:
- `icon`
- `icon-light`
- `icon-dark`

Пример:
```bash
npm run update-paths
```

Заменит:
```xml
icon-light="/Users/alexey/Documents/..."
icon-dark="/Users/alexey/Documents/..."
```

На:
```xml
icon-light="/Users/john/Documents/..."
icon-dark="/Users/john/Documents/..."
```

## Best Practices

1. **Используйте `icon-light` и `icon-dark`** когда иконки действительно разные
2. **Используйте просто `icon`** когда иконка универсальная
3. **Группируйте иконки по категориям** для удобства поиска
4. **Документируйте нестандартные пути** в комментариях XML

## Переключение темы

Тема передается из `App.jsx` через все компоненты:
```javascript
const [theme, setTheme] = useState('light');
```

При переключении темы все иконки автоматически обновляются на соответствующие версии.
