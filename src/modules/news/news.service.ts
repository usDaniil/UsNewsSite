import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Tag } from '../tag/tag.model';
import { User } from '../user/user.model';

import { News } from './news.model';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News)
    private readonly newsRepo: typeof News,
  ) {}

  findAllNews(): Promise<News[]> {
    return this.newsRepo.findAll({
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
}
