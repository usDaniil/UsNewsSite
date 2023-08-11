import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from 'src/db/models/news.model';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('')
  findAllTasks(): Promise<News[]> {
    return this.newsService.findAllNews();
  }
}
