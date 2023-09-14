import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Tag } from './tag.model';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag) private readonly tagRepo: typeof Tag) {}

  async findOrCreate(tags: string[]): Promise<Tag[]> {
    const findTags: Tag[] = [];
    tags.forEach(async (val: string) => {
      const [tag, bool] = await this.tagRepo.findOrCreate({
        where: { value: val },
      });
      findTags.push(tag);
    });
    return findTags;
  }
}
