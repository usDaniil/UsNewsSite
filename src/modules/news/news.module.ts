import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { TagModule } from '../tag/tag.module';

import { NewsController } from './news.controller';
import { News } from './news.model';
import { NewsService } from './news.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [SequelizeModule.forFeature([News]), TagModule, AuthModule],
})
export class NewsModule {}
