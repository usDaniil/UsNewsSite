import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { News } from '../../db/models/news.model';
import { Tag } from '../../db/models/tag.model';
import { User } from '../../db/models/user.model';

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
