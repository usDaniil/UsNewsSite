import { Controller, Get } from '@nestjs/common';

import { News } from '../../db/models/news.model';

import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAllNews(): Promise<News[]> {
    return this.newsService.findAllNews();
  }
}
