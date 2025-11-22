/**
 * Vite плагин для обслуживания иконок из внешней директории
 * Позволяет использовать абсолютные пути к иконкам в браузере
 */
import fs from 'fs';
import path from 'path';
import { homedir } from 'os';

export default function serveIconsPlugin(iconsBasePath) {
    return {
        name: 'serve-icons',
        configureServer(server) {
            console.log('🔌 Icon serving plugin activated');
            console.log('📁 Icons base path:', iconsBasePath);
            
            server.middlewares.use((req, res, next) => {
                // Проверяем, является ли запрос к файлу иконки
                // Поддерживаем как абсолютные пути /Users/..., так и алиас @icons/...
                if (req.url && (req.url.startsWith('/Users/') || req.url.startsWith('/@icons/'))) {
                    let filePath = decodeURIComponent(req.url);
                    
                    // Заменяем @icons на реальный путь
                    if (filePath.startsWith('/@icons/')) {
                        filePath = filePath.replace('/@icons/', `${iconsBasePath}/`);
                    }
                    
                    console.log('🖼️  Icon request:', filePath);
                    
                    // Проверяем существование файла
                    if (fs.existsSync(filePath)) {
                        console.log('✅ Icon found:', filePath);
                        // Определяем MIME тип
                        const ext = path.extname(filePath).toLowerCase();
                        const mimeTypes = {
                            '.svg': 'image/svg+xml',
                            '.png': 'image/png',
                            '.jpg': 'image/jpeg',
                            '.jpeg': 'image/jpeg',
                            '.gif': 'image/gif',
                            '.webp': 'image/webp'
                        };
                        
                        const mimeType = mimeTypes[ext] || 'application/octet-stream';
                        
                        // Читаем и отправляем файл
                        const content = fs.readFileSync(filePath);
                        res.setHeader('Content-Type', mimeType);
                        res.setHeader('Cache-Control', 'public, max-age=3600');
                        res.end(content);
                        return;
                    } else {
                        console.warn(`⚠️  Icon not found: ${filePath}`);
                        res.statusCode = 404;
                        res.end('Icon not found');
                        return;
                    }
                }
                
                next();
            });
        }
    };
}
