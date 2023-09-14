import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { AuthGuard } from '../auth/auth.guard';
import { Tag } from '../tag/tag.model';
import { TagService } from '../tag/tag.service';
import { User } from '../user/user.model';

import { CreateNewsDto } from './dto/create.news.dto';
import { CreateNews } from './types/createNews';
import { News } from './news.model';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News)
    private readonly newsRepo: typeof News,
    private tagService: TagService,
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
  @UseGuards(AuthGuard)
  async addNews(
    { text, header, imagePath, tags }: CreateNews,
    userId: number,
  ): Promise<News> {
    try {
      const tagsExtends = await this.tagService.findOrCreate(tags);
      const news: CreateNewsDto = {
        text,
        header,
        imagePath,
        userId,
      };
      console.log(news.header);
      const newsCreated: News = await this.newsRepo.create({ ...news });
      await newsCreated.$set('tags', tagsExtends);
      return newsCreated;
    } catch (exception) {
      if (exception instanceof Error) console.log(exception);
      throw new BadRequestException('failed to create news');
    }
  }
}
