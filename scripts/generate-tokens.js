#!/usr/bin/env node

/**
 * Генератор CSS переменных из tokens.json
 * Автоматически создает tokens.css на основе дизайн-токенов
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Пути к файлам
const TOKENS_PATH = path.join(__dirname, '../tokens.json');
const OUTPUT_PATH = path.join(__dirname, '../src/styles/tokens.css');

/**
 * Конвертирует camelCase в kebab-case
 */
function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Генерирует CSS переменную из имени токена
 */
function generateVarName(tokenName, prefix = '') {
  const kebab = toKebabCase(tokenName);
  return prefix ? `--${prefix}-${kebab}` : `--${kebab}`;
}

/**
 * Генерирует CSS для секции токенов
 */
function generateTokenSection(tokens, prefix, theme = 'light') {
  const cssVars = [];

  for (const [key, value] of Object.entries(tokens)) {
    if (value && typeof value === 'object' && 'light' in value && 'dark' in value) {
      const varName = generateVarName(key, prefix);
      const color = value[theme];
      cssVars.push(`  ${varName}: ${color};`);
    }
  }

  return cssVars.join('\n');
}

/**
 * Основная функция генерации
 */
function generateTokensCSS() {
  console.log('🎨 Генерация CSS переменных из tokens.json...\n');

  // Читаем tokens.json
  const rawData = fs.readFileSync(TOKENS_PATH, 'utf8');
  const tokens = JSON.parse(JSON.parse(rawData));

  console.log('📊 Найдено разделов:', Object.keys(tokens).length);

  // Генерируем CSS
  let css = `/**
 * ARES kudo Design System - CSS Variables
 * 
 * ⚠️ ЭТОТ ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ
 * Не редактируйте вручную! Используйте: npm run generate:tokens
 * 
 * Источник: tokens.json
 * Сгенерировано: ${new Date().toISOString()}
 */

/* ============================================
   ГЛОБАЛЬНЫЕ ТОКЕНЫ - СВЕТЛАЯ ТЕМА
   ============================================ */

:root {
${generateTokenSection(tokens.globalColorTokens, 'states', 'light')}
}

/* ============================================
   ГЛОБАЛЬНЫЕ ТОКЕНЫ - ТЕМНАЯ ТЕМА
   ============================================ */

:root[data-theme="dark"],
.dark-theme {
${generateTokenSection(tokens.globalColorTokens, 'states', 'dark')}
}

/* ============================================
   ARES KUDO - СВЕТЛАЯ ТЕМА
   ============================================ */

:root {
${generateTokenSection(tokens.aRESKudo, 'kudo', 'light')}
}

/* ============================================
   ARES KUDO - ТЕМНАЯ ТЕМА
   ============================================ */

:root[data-theme="dark"] {
${generateTokenSection(tokens.aRESKudo, 'kudo', 'dark')}
}

/* ============================================
   АВТОМАТИЧЕСКОЕ ОПРЕДЕЛЕНИЕ ТЕМЫ
   ============================================ */

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${generateTokenSection(tokens.globalColorTokens, 'states', 'dark').split('\n').map(line => '  ' + line.trim()).join('\n')}
  }
}

/* ============================================
   СЕМАНТИЧЕСКИЕ ПЕРЕМЕННЫЕ
   ============================================ */

:root {
  /* Основные цвета */
  --color-primary: var(--states-background-primary-standard);
  --color-secondary: var(--states-background-secondary-standard);
  --color-text: var(--states-text-color-standard);
  --color-border: var(--states-border-secondary-standard);
  
  /* Интерактивные состояния */
  --color-hover: var(--states-background-primary-hover);
  --color-active: var(--states-background-primary-active);
  --color-disabled: var(--states-background-primary-disabled);
  
  /* Тени */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  /* Радиусы */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
  
  /* Переходы */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
}
`;

  // Сохраняем файл
  fs.writeFileSync(OUTPUT_PATH, css);

  console.log('✅ Файл создан:', OUTPUT_PATH);
  console.log('\n📈 Статистика:');
  console.log('  - globalColorTokens:', Object.keys(tokens.globalColorTokens).length, 'токенов');
  console.log('  - aRESkudo:', Object.keys(tokens.aRESKudo).length, 'токенов');
  console.log('  - aRESCommander:', Object.keys(tokens.aRESCommander).length, 'токенов');
  console.log('  - xDraftSight:', Object.keys(tokens.xDraftSight).length, 'токенов');
  console.log('\n🎉 Готово!');
}

// Запуск
try {
  generateTokensCSS();
} catch (error) {
  console.error('❌ Ошибка:', error.message);
  process.exit(1);
}
