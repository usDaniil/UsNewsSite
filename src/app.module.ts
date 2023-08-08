import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagsNews } from './db/models/tagsnews.models';
import { Tag } from './db/models/tags.models';
import { News } from './db/models/news.models';
import { User } from './db/models/users.models';
import { Dialect } from 'sequelize/types/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      models: [User, News, Tag, TagsNews],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
