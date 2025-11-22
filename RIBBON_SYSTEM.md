# Система конфигурации Ribbon

## Обзор

Ribbon интерфейс ARES kudo полностью управляется через XML конфигурацию. Это позволяет:

- Декларативно описывать структуру интерфейса
- Легко добавлять новые секции и команды
- Изменять порядок элементов без изменения кода
- Группировать команды с разделителями
- Поддерживать светлую и темную темы

## Структура XML конфигурации

### Основные элементы

```xml
<ribbon>
  <section name="Draw">
    <row>
      <ribbonItem />
      <splitButton />
      <select />
    </row>
  </section>
</ribbon>
```

### Типы элементов

#### 1. RibbonItem - Простая кнопка

```xml
<!-- С текстом и иконкой -->
<ribbonItem id="circle" label="Circle" icon="circle.svg" />

<!-- Только иконка -->
<ribbonItem id="arc" icon="arc.svg" />
```

#### 2. SplitButton - Кнопка с выпадающим меню

```xml
<!-- С текстом -->
<splitButton id="line" label="Line" icon="line.svg">
  <dropdown>
    <item id="line" label="Line" icon="line.svg" />
    <item id="ray" label="Ray" icon="ray.svg" />
  </dropdown>
</splitButton>

<!-- Без текста (только иконка) -->
<splitButton id="polyline" icon="polyline.svg">
  <dropdown>
    <item id="polyline" label="Polyline" icon="polyline.svg" />
    <item id="3dPolyline" label="3D Polyline" icon="3d_polyline.svg" />
  </dropdown>
</splitButton>
```

#### 3. Группы с разделителями

```xml
<splitButton id="line" label="Line" icon="line.svg">
  <dropdown>
    <item id="line" label="Line" icon="line.svg" />

    <!-- Группа с разделителями сверху и снизу -->
    <group dividers="true">
      <item id="infiniteLine" label="Infinite Line" icon="constuction_line.svg" />
      <item id="ray" label="Ray" icon="ray.svg" />
    </group>

    <item id="richLine" label="RichLine" icon="mline.svg" />
  </dropdown>
</splitButton>
```

#### 4. Select (в разработке)

```xml
<select id="layerSelect" label="Layers Manager" width="200" />
```

## Структура файлов

```
src/
├── config/
│   └── ribbon-config.xml          # XML конфигурация ribbon
├── utils/
│   └── ribbonConfigParser.js      # Парсер XML конфигурации
├── ribbon/
│   ├── Ribbon/                    # Главный компонент
│   │   ├── Ribbon.jsx
│   │   └── Ribbon.css
│   ├── RibbonSection/             # Секция ribbon
│   │   ├── RibbonSection.jsx
│   │   └── RibbonSection.css
│   ├── RibbonRow/                 # Ряд элементов
│   │   ├── RibbonRow.jsx
│   │   └── RibbonRow.css
│   ├── DynamicSplitButton/        # Универсальный SplitButton
│   │   ├── DynamicSplitButton.jsx
│   │   └── DynamicSplitButton.css
│   ├── DynamicIcon/               # Динамическая загрузка иконок
│   │   └── DynamicIcon.jsx
│   ├── RibbonItem/                # Базовая кнопка
│   └── SplitArrow/                # Стрелка для dropdown
└── icons/
    └── ribbon/
        └── home/
            └── draw/
                ├── light/         # Иконки для светлой темы
                └── dark/          # Иконки для темной темы
```

## Использование

### В App.jsx

```jsx
import Ribbon from "./ribbon/Ribbon/Ribbon";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="App">
      <Ribbon configPath="/src/config/ribbon-config.xml" theme={theme} />
    </div>
  );
}
```

## Добавление новых элементов

### 1. Добавить иконки

Поместите SVG файлы в:

- `src/icons/ribbon/home/draw/light/your-icon.svg`
- `src/icons/ribbon/home/draw/dark/your-icon.svg`

### 2. Обновить XML конфигурацию

```xml
<section name="YourSection">
  <row>
    <ribbonItem id="yourCommand" label="Your Command" icon="your-icon.svg" />
  </row>
</section>
```

### 3. Перезагрузить приложение

Изменения применятся автоматически!

## Преимущества системы

✅ **Декларативность** - вся структура в одном XML файле
✅ **Гибкость** - легко менять порядок и группировку
✅ **Масштабируемость** - просто добавлять новые секции
✅ **Темы** - автоматическое переключение иконок
✅ **Группировка** - визуальное выделение команд разделителями
✅ **Без кода** - изменения без правки JavaScript

## Пример полной секции

```xml
<section name="Draw">
  <row>
    <!-- SplitButton с группировкой -->
    <splitButton id="line" label="Line" icon="line.svg">
      <dropdown>
        <item id="line" label="Line" icon="line.svg" />
        <group dividers="true">
          <item id="infiniteLine" label="Infinite Line" icon="constuction_line.svg" />
          <item id="ray" label="Ray" icon="ray.svg" />
        </group>
        <item id="richLine" label="RichLine" icon="mline.svg" />
      </dropdown>
    </splitButton>

    <!-- Обычные кнопки -->
    <ribbonItem id="circle" label="Circle" icon="circle.svg" />
    <ribbonItem id="arc" icon="arc.svg" />
  </row>

  <row>
    <ribbonItem id="rectangle" label="Rectangle" icon="rectangle.svg" />
    <ribbonItem id="polygon" label="Polygon" icon="polygon.svg" />
  </row>
</section>
```

## Roadmap

- [ ] Поддержка Select компонентов
- [ ] Валидация XML схемы
- [ ] Горячая перезагрузка конфигурации
- [ ] Экспорт конфигурации в JSON
- [ ] Визуальный редактор конфигурации
