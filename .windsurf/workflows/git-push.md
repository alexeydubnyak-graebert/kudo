---
description: Push changes to Git repository
---

# Git Push Workflow

Быстрый пуш изменений в Git репозиторий с автоматическим коммитом.

## Шаги:

1. Проверить статус изменений

```bash
git status
```

2. Добавить все изменения
   // turbo

```bash
git add -A
```

3. Создать коммит с описанием

```bash
git commit -m "feat: [описание изменений]"
```

_Замените [описание изменений] на краткое описание того, что было сделано_

4. Запушить в репозиторий
   // turbo

```bash
git push
```

## Быстрые команды:

### Для мелких изменений (одной командой):

```bash
git add -A && git commit -m "update" && git push
```

### Для важных изменений с подробным описанием:

```bash
git add -A && git commit -m "feat: добавлена новая функция" && git push
```

## Типы коммитов:

- `feat:` - новая функция
- `fix:` - исправление бага
- `docs:` - изменения в документации
- `style:` - форматирование кода
- `refactor:` - рефакторинг
- `test:` - добавление тестов
- `chore:` - обновление зависимостей, конфигурации

## Примеры:

```bash
git add -A && git commit -m "feat: добавлен drag-and-drop в Favorites" && git push
git add -A && git commit -m "fix: исправлена ошибка с дубликатами" && git push
git add -A && git commit -m "style: улучшены стили компонента Sidebar" && git push
```
