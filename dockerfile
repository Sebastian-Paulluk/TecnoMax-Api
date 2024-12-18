FROM node:20.10.0-alpine

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

CMD ["node", "./src/index.js"]