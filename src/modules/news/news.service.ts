import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { News } from 'src/db/models/news.model';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News)
    private readonly newsRepo: typeof News,
  ) {}

  findAllNews(): Promise<News[]> {
    return this.newsRepo.findAll();
  }
}
