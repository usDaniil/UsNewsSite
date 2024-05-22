FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx sequelize-cli db:migrate

RUN npm run build

CMD [ "npm", "run", "start:dev" ]