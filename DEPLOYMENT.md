# Развертывание Kudo

## Автоматический деплой на AWS S3

### Быстрая настройка

```bash
# 1. Настройте деплой (только один раз)
chmod +x setup-deploy.sh
./setup-deploy.sh

# 2. Запустите деплой
./deploy.sh
```

### Требования

- **Node.js** версии 18+
- **AWS CLI** установлен и настроен
- **Доступ к S3 bucket** `graebert-dev-projects`

## Подробная инструкция

### 1. Установка AWS CLI

#### macOS

```bash
brew install awscli
```

#### Windows

```bash
# Скачайте с https://aws.amazon.com/cli/
```

#### Linux

```bash
sudo apt-get install awscli
```

### 2. Настройка AWS креденшиалов

```bash
aws configure
```

Введите:

- AWS Access Key ID
- AWS Secret Access Key
- Default region: `eu-west-1`
- Default output format: `json`

### 3. Проверка доступа

```bash
# Проверка авторизации
aws sts get-caller-identity

# Проверка доступа к bucket
aws s3 ls s3://graebert-dev-projects
```

### 4. Настройка проекта

```bash
# Запустите интерактивную настройку
./setup-deploy.sh
```

Скрипт автоматически:

- ✅ Проверит AWS CLI и доступ
- ✅ Обновит конфигурацию в `deploy.sh`
- ✅ Добавит npm скрипты в `package.json`
- ✅ Обновит `.gitignore`

### 5. Деплой

#### Автоматический деплой

```bash
./deploy.sh
```

#### Через npm

```bash
npm run deploy
```

#### Только загрузка в S3

```bash
npm run deploy:aws
```

## Конфигурация

### Настройки в deploy.sh

```bash
BUCKET_NAME="graebert-dev-projects"      # S3 bucket
S3_PATH="ares-kudo"                      # путь в bucket
CLOUDFRONT_DISTRIBUTION_ID=""            # CloudFront ID (опционально)
BUILD_DIR="dist"                         # папка билда
```

### Base URL для Vite

В `vite.config.js` должен быть правильный base URL:

```javascript
export default defineConfig({
  base: "/ares-kudo/",
  // ...
});
```

## Процесс деплоя

1. **Билд проекта**: `npm run build`
2. **Загрузка статики**: синхронизация с S3 bucket
3. **Кеширование**: статика кешируется на год, HTML - 5 минут
4. **CloudFront**: опциональная инвалидация кеша

## Доступ к сайту

После деплоя сайт доступен по адресу:

```
https://projects.dev.graebert.com/ares-kudo/
```

## Устранение проблем

### "AWS CLI not found"

```bash
# Установите AWS CLI
brew install awscli  # macOS
```

### "Access Denied"

```bash
# Проверьте креденшиалы
aws sts get-caller-identity

# Проверьте права доступа к bucket
aws s3 ls s3://graebert-dev-projects
```

### "Build failed"

```bash
# Очистите кеш и переустановите зависимости
rm -rf node_modules package-lock.json
npm install
npm run build
```

### "Permission denied" для скриптов

```bash
# Сделайте скрипты исполняемыми
chmod +x deploy.sh
chmod +x setup-deploy.sh
```

## Обновление конфигурации

Для изменения настроек запустите:

```bash
./setup-deploy.sh
```

Или отредактируйте `deploy.sh` вручную.

## Мониторинг

### Проверка деплоя

```bash
# Проверка файлов в S3
aws s3 ls s3://graebert-dev-projects/ares-kudo/

# Проверка сайта
curl -I https://projects.dev.graebert.com/ares-kudo/
```

### CloudFront кеш

Если настроен CloudFront, для принудительного обновления:

```bash
aws cloudfront create-invalidation \
    --distribution-id YOUR_DISTRIBUTION_ID \
    --paths "/*"
```

## Безопасность

- ✅ Креденшиалы AWS хранятся локально
- ✅ Секреты не попадают в Git
- ✅ Минимальные права доступа к S3
- ✅ HTTPS подключение

## Поддержка

При проблемах с деплоем:

1. Проверьте AWS CLI: `aws --version`
2. Проверьте креденшиалы: `aws sts get-caller-identity`
3. Проверьте доступ к bucket: `aws s3 ls s3://graebert-dev-projects`
4. Запустите деплой с флагом отладки: `./deploy.sh --debug`
