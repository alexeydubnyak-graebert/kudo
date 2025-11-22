import fs from 'fs';

// Читаем файл
const rawData = fs.readFileSync('tokens.json', 'utf8');

// Парсим дважды, так как это строка с JSON внутри
const parsedData = JSON.parse(JSON.parse(rawData));

// Анализируем структуру
console.log('=== Анализ tokens.json ===\n');
console.log('Основные разделы:');
Object.keys(parsedData).forEach(key => {
  const section = parsedData[key];
  const tokenCount = Object.keys(section).length;
  console.log(`  - ${key}: ${tokenCount} токенов`);
});

// Примеры токенов из globalColorTokens
console.log('\n=== Примеры глобальных токенов ===');
const globalTokens = parsedData.globalColorTokens;
const examples = Object.keys(globalTokens).slice(0, 5);
examples.forEach(key => {
  console.log(`\n${key}:`);
  console.log(`  light: ${globalTokens[key].light}`);
  console.log(`  dark: ${globalTokens[key].dark}`);
});

// Сохраняем отформатированный JSON
fs.writeFileSync('tokens-formatted.json', JSON.stringify(parsedData, null, 2));
console.log('\n✅ Создан файл tokens-formatted.json');
