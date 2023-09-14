import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { RequestUser } from '../auth/types/requestUser';

import { CreateNews } from './types/createNews';
import { News } from './news.model';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAllNews(): Promise<News[]> {
    return this.newsService.findAllNews();
  }
  @UseGuards(AuthGuard)
  @Post()
  async addNews(
    @Request() auth: RequestUser,
    @Body() data: CreateNews,
  ): Promise<News> {
    const user = await auth.user;
    return this.newsService.addNews(data, user.id);
  }
}
