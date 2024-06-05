FROM node:20

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn sequelize-cli db:migrate

RUN yarn build

CMD [ "npm", "run", "start:dev" ]