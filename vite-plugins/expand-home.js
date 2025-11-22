/**
 * Vite плагин для раскрытия ~/ в путях
 * Заменяет ~/ на домашнюю директорию пользователя
 */
import { homedir } from 'os';

export default function expandHomePlugin() {
    return {
        name: 'expand-home',
        config(config, { mode }) {
            // Получаем домашнюю директорию
            const home = homedir();
            
            // Раскрываем ~/ в переменных окружения
            if (config.define) {
                Object.keys(config.define).forEach(key => {
                    if (typeof config.define[key] === 'string' && config.define[key].includes('~/')) {
                        config.define[key] = config.define[key].replace(/~\//g, `${home}/`);
                    }
                });
            }
            
            // Обрабатываем переменные окружения из .env
            const env = config.env || {};
            Object.keys(env).forEach(key => {
                if (typeof env[key] === 'string' && env[key].startsWith('~/')) {
                    env[key] = env[key].replace('~/', `${home}/`);
                }
            });
            
            return config;
        }
    };
}
