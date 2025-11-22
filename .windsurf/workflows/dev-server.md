---
description: Start development server
---

# Development Server Workflow

Запуск dev сервера для разработки.

## Шаги:

1. Запустить Vite dev server
   // turbo

```bash
npm run dev
```

Сервер будет доступен по адресу: http://localhost:5173 (или другой порт, если 5173 занят)

## Дополнительные команды:

### Остановить сервер:

Нажмите `Ctrl+C` в терминале

### Очистить кэш и перезапустить:

```bash
rm -rf node_modules/.vite && npm run dev
```

### Проверить порты:

```bash
lsof -i :5173
```
