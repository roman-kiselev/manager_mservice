# Используем образ Node.js
FROM node

# Установим рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json (если он есть) в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы в рабочую директорию
COPY . .

# Генерируем клиент Prisma
RUN npx prisma generate

# Компилируем TypeScript в JavaScript (предполагается, что у вас есть tsconfig.json)
RUN npm run build

# Копируем файл окружения
COPY .env ./dist

# Открываем порт, который будет использован приложением
EXPOSE 7001

# Команда для запуска приложения
CMD ["node", "dist/src/main"]