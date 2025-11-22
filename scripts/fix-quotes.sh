#!/bin/bash

# Скрипт для замены типографских кавычек на обычные в ribbon-config.xml

CONFIG_FILE="src/config/ribbon-config.xml"

echo "🔧 Исправление кавычек в $CONFIG_FILE..."

# Создаем резервную копию
cp "$CONFIG_FILE" "$CONFIG_FILE.backup"

# Заменяем типографские кавычки на обычные
sed -i '' "s/'/'/g" "$CONFIG_FILE"
sed -i '' "s/'/'/g" "$CONFIG_FILE"
sed -i '' 's/"/"/g' "$CONFIG_FILE"
sed -i '' 's/"/"/g' "$CONFIG_FILE"

echo "✅ Готово! Резервная копия: $CONFIG_FILE.backup"
