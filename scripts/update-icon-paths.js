#!/usr/bin/env node

/**
 * Скрипт для обновления путей к иконкам в ribbon-config.xml
 * Заменяет имя пользователя в путях на текущее
 */

import fs from 'fs';
import path from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к XML файлу конфигурации
const CONFIG_PATH = path.join(__dirname, '../src/config/ribbon-config.xml');

// Получаем текущее имя пользователя из домашней директории
const currentHome = homedir();
const currentUsername = path.basename(currentHome);

console.log('🔧 Обновление путей к иконкам...');
console.log(`📁 Текущий пользователь: ${currentUsername}`);
console.log(`📁 Домашняя директория: ${currentHome}`);

try {
    // Читаем XML файл
    let xmlContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
    
    // Регулярное выражение для поиска путей с /Users/username/
    const userPathRegex = /\/Users\/[^\/]+\//g;
    
    // Подсчитываем количество замен
    const matches = xmlContent.match(userPathRegex);
    const replacementCount = matches ? matches.length : 0;
    
    if (replacementCount === 0) {
        console.log('✅ Пути не содержат абсолютных путей с именем пользователя');
        console.log('ℹ️  Возможно, используются относительные пути или ~/');
        process.exit(0);
    }
    
    // Показываем найденные пути
    console.log(`\n📋 Найдено путей для замены: ${replacementCount}`);
    const uniquePaths = [...new Set(matches)];
    uniquePaths.forEach(p => console.log(`   ${p}`));
    
    // Заменяем все пути на текущего пользователя
    const updatedContent = xmlContent.replace(userPathRegex, `/Users/${currentUsername}/`);
    
    // Создаем резервную копию
    const backupPath = `${CONFIG_PATH}.backup`;
    fs.copyFileSync(CONFIG_PATH, backupPath);
    console.log(`\n💾 Создана резервная копия: ${path.basename(backupPath)}`);
    
    // Записываем обновленный файл
    fs.writeFileSync(CONFIG_PATH, updatedContent, 'utf-8');
    
    console.log(`\n✅ Успешно обновлено путей: ${replacementCount}`);
    console.log(`📝 Все пути теперь используют: /Users/${currentUsername}/`);
    console.log('\n🎉 Готово! Можно запускать проект.');
    
} catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
}
