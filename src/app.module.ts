import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize/types/sequelize';

import { AppService } from './app.service';
import { TagNews } from './db/models/tagnews.model';
import { Tag } from './db/models/tag.model';
import { News } from './db/models/news.model';
import { User } from './db/models/user.model';
import { NewsModule } from './modules/news/news.module';

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
      models: [User, News, Tag, TagNews],
    }),
    NewsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
