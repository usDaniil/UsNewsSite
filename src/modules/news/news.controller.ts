import { Body, Controller, Get, Post } from '@nestjs/common';

import { News } from './news.model';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAllNews(): Promise<News[]> {
    return this.newsService.findAllNews();
  }
  @Post()
  addNews(@Body() news): Promise<News> {
    return this.newsService.addNews(news);
  }
}
