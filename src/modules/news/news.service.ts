import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Tag } from '../tag/tag.model';
import { User } from '../user/user.model';

import { CreateNews, INews } from './types/news.dto';
import { News } from './news.model';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News)
    private readonly newsRepo: typeof News,
  ) {}

  findAllNews(): Promise<News[]> {
    const news = this.newsRepo.findAll({
      include: [
        {
          model: Tag,
          attributes: ['id', 'value'],
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          attributes: ['id', 'login'],
        },
      ],
    });
    return news;
  }

  findNewsById(id: number): Promise<News> {
    return this.newsRepo.findOne({
      where: { id },
      include: [
        {
          model: Tag,
          attributes: ['id', 'value'],
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          attributes: ['id', 'login'],
        },
      ],
    });
  }
  addNews(news: CreateNews): Promise<News> {
    console.log(news);
    return this.newsRepo.create({ ...news });
  }
}
