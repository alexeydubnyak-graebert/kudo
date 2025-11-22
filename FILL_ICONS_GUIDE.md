# Инструкция по заполнению путей к иконкам

## Формат заглушек

Все элементы в `ribbon-config.xml` имеют заглушки:

```xml
icon-light="/Users/dubnyakalexey/Documents/GitHub/application-icons/PATH_TO_LIGHT_ICON"
icon-dark="/Users/dubnyakalexey/Documents/GitHub/application-icons/PATH_TO_DARK_ICON"
```

## Как заполнять

### 1. Найдите нужную иконку в репозитории

```bash
# Поиск иконки по имени
find ~/Documents/GitHub/application-icons -name "*line*" -type f
```

### 2. Замените заглушку на полный путь

**Было:**
```xml
<ribbonItem 
  id="line" 
  label="Line" 
  icon-light="/Users/dubnyakalexey/Documents/GitHub/application-icons/PATH_TO_LIGHT_ICON"
  icon-dark="/Users/dubnyakalexey/Documents/GitHub/application-icons/PATH_TO_DARK_ICON"
/>
```

**Стало:**
```xml
<ribbonItem 
  id="line" 
  label="Line" 
  icon-light="/Users/dubnyakalexey/Documents/GitHub/application-icons/Modules/Desktop/ARGONQT/Resources/svg_icons/light/draw/Line.svg"
  icon-dark="/Users/dubnyakalexey/Documents/GitHub/application-icons/Modules/Desktop/ARGONQT/Resources/svg_icons/dark/draw/Line.svg"
/>
```

## Примеры структуры путей

### Типичная структура для draw иконок:

**Light theme:**
```
/Users/dubnyakalexey/Documents/GitHub/application-icons/Modules/Desktop/ARGONQT/Resources/svg_icons/light/draw/Line.svg
```

**Dark theme:**
```
/Users/dubnyakalexey/Documents/GitHub/application-icons/Modules/Desktop/ARGONQT/Resources/svg_icons/dark/draw/Line.svg
```

### Если иконка называется по-разному:

```xml
<ribbonItem 
  id="line" 
  label="Line" 
  icon-light="/Users/dubnyakalexey/Documents/GitHub/application-icons/.../light/draw/Line.svg"
  icon-dark="/Users/dubnyakalexey/Documents/GitHub/application-icons/.../dark/draw/LineDark.svg"
/>
```

### Если иконка в разных местах:

```xml
<ribbonItem 
  id="special" 
  label="Special" 
  icon-light="/Users/dubnyakalexey/Documents/GitHub/application-icons/Modules/Desktop/ARGONQT/Resources/svg_icons/light/special/icon.svg"
  icon-dark="/Users/dubnyakalexey/Documents/GitHub/application-icons/Modules/Other/Resources/icons/dark/icon.svg"
/>
```

## Полезные команды для поиска иконок

### Поиск всех SVG файлов в папке draw:

```bash
ls ~/Documents/GitHub/application-icons/Modules/Desktop/ARGONQT/Resources/svg_icons/light/draw/
ls ~/Documents/GitHub/application-icons/Modules/Desktop/ARGONQT/Resources/svg_icons/dark/draw/
```

### Поиск конкретной иконки:

```bash
# Поиск Line.svg
find ~/Documents/GitHub/application-icons -name "Line.svg" -o -name "line.svg"

# Поиск с игнорированием регистра
find ~/Documents/GitHub/application-icons -iname "line.svg"
```

### Поиск иконок содержащих слово в названии:

```bash
find ~/Documents/GitHub/application-icons -name "*polyline*"
```

## Список элементов для заполнения

### Секция Draw (первый ряд):
- [ ] line (SplitButton + 4 dropdown items)
- [ ] polyline (SplitButton + 2 dropdown items)
- [ ] circle
- [ ] arc

### Секция Draw (второй ряд):
- [ ] rectangle
- [ ] polygon
- [ ] ellipse
- [ ] hatch

### Секция Modify:
- [ ] move
- [ ] rotate
- [ ] scale
- [ ] mirror
- [ ] array

### Секция Annotations:
- [ ] text (SplitButton + 2 dropdown items)
- [ ] dimension
- [ ] leader
- [ ] table

### Секция Layers:
- [ ] byLayer

## После заполнения

1. **Сохраните файл**
2. **Обновите страницу в браузере** (или перезапустите dev-сервер)
3. **Проверьте консоль** на наличие ошибок 404

## Если иконка не найдена

Если иконки нет в репозитории, можно:
1. Использовать похожую иконку
2. Оставить заглушку (иконка не отобразится)
3. Добавить иконку в репозиторий

## Скрипт обновления путей

После заполнения, при переносе на другой компьютер используйте:

```bash
npm run update-paths
```

Это автоматически заменит `/Users/dubnyakalexey/` на имя текущего пользователя.
