import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { News } from 'src/db/models/news.model';
import { Tag } from 'src/db/models/tag.model';
import { TagNews } from 'src/db/models/tagnews.model';
import { User } from 'src/db/models/user.model';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News)
    private readonly newsRepo: typeof News,
  ) {}

  findAllNews(): Promise<News[]> {
    return this.newsRepo.findAll({ include: [Tag, User] });
  }
}
