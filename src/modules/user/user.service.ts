import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateUserDto } from '../auth/dto/createUser.dto';
import { News } from '../news/news.model';
import { Tag } from '../tag/tag.model';

import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userRepo: typeof User,
  ) {}
  checkUser(email: string): Promise<User> {
    return this.userRepo.findOne({
      where: { email },
    });
  }
  getUserById(id: number): Promise<User> {
    return this.userRepo.findOne({
      where: { id },
      include: [
        {
          model: News,
          attributes: ['header', 'imagePath', 'text', 'createdAt', 'updatedAt'],
          include: [
            {
              model: Tag,
              attributes: ['id', 'value'],
            },
          ],
        },
      ],
    });
  }
  createUser(request: CreateUserDto): Promise<User> {
    return this.userRepo.create({ ...request });
  }
}
