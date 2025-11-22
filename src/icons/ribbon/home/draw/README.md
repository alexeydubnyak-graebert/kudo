# Иконки инструментов рисования

Этот каталог содержит SVG иконки для инструментов рисования в ленте интерфейса ARES kudo.

## Структура

```
draw/
├── light/              # Светлая тема (56 иконок)
├── dark/               # Темная тема (5 иконок)
├── index.js            # Экспорт всех иконок
├── LineIcon.jsx        # Компонент иконки "Линия"
├── PolylineIcon.jsx    # Компонент иконки "Полилиния"
├── MlineIcon.jsx       # Компонент иконки "Мультилиния"
├── ConstructionLineIcon.jsx  # Компонент иконки "Вспомогательная линия"
└── Polyline3DIcon.jsx  # Компонент иконки "3D Полилиния"
```

## Использование

### Импорт иконок

```jsx
import {
  LineIcon,
  PolylineIcon,
  MlineIcon,
  ConstructionLineIcon,
  Polyline3DIcon,
} from "../../icons/ribbon/home/draw";
```

### Использование в компонентах

```jsx
// Базовое использование (светлая тема по умолчанию)
<LineIcon />

// С темной темой
<LineIcon theme="dark" />

// С дополнительным классом
<LineIcon className="custom-class" />
```

## Доступные иконки

### Линии

- **LineIcon** - Простая линия (`line.svg`)
- **PolylineIcon** - Полилиния (`polyline.svg`)
- **Polyline3DIcon** - 3D Полилиния (`3d_polyline.svg`)
- **MlineIcon** - Мультилиния (`mline.svg`)
- **ConstructionLineIcon** - Вспомогательная линия (`constuction_line.svg`)

## Добавление новых иконок

1. Экспортируйте SVG иконку из Figma (16x16px)
2. Поместите в папки `light/` и `dark/`
3. Создайте React компонент:

```jsx
import PropTypes from "prop-types";
import lightIcon from "./light/your-icon.svg";
import darkIcon from "./dark/your-icon.svg";

const YourIcon = ({ className = "", theme = "light" }) => {
  const iconSrc = theme === "dark" ? darkIcon : lightIcon;

  return (
    <img
      src={iconSrc}
      alt="Your Icon"
      className={`ribbon-icon ${className}`}
      width="16"
      height="16"
    />
  );
};

YourIcon.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.oneOf(["light", "dark"]),
};

export default YourIcon;
```

4. Добавьте экспорт в `index.js`:

```js
export { default as YourIcon } from "./YourIcon";
```

## Примечания

- Все иконки имеют размер 16x16 пикселей
- Поддерживаются светлая и темная темы
- Иконки экспортированы из Figma без постфиксов размера
- Используется формат SVG для масштабируемости
