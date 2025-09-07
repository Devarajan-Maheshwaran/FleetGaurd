FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production || npm install --omit=dev
COPY public ./public
COPY server.js ./server.js
EXPOSE 5173
CMD ["node","server.js"]
