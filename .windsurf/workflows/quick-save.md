---
description: Quick commit and push all changes
---

# Quick Save Workflow

Быстрое сохранение всех изменений в Git с одной командой.

## Основная команда:

// turbo

```bash
git add -A && git commit -m "update: quick save" && git push
```

## С описанием изменений:

Замените "описание" на краткое описание ваших изменений:

```bash
git add -A && git commit -m "feat: описание" && git push
```

## Примеры:

```bash
# Добавлена новая функция
git add -A && git commit -m "feat: добавлен drag-and-drop" && git push

# Исправлен баг
git add -A && git commit -m "fix: исправлена ошибка загрузки" && git push

# Улучшены стили
git add -A && git commit -m "style: обновлены стили Favorites" && git push

# Обновлена документация
git add -A && git commit -m "docs: обновлен README" && git push
```

## Проверка перед пушем:

Если хотите проверить, что будет закоммичено:

```bash
git status
git diff
```
