import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateUserDto } from '../auth/dto/createUser.dto';
import { News } from '../news/news.model';
import { Tag } from '../tag/tag.model';

import { UpdateUserDto } from './dto/updateUser.dto';
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
          attributes: [
            'header',
            'imagePath',
            'text',
            'createdAt',
            'updatedAt',
            'createdAt',
            'id',
          ],
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
  async editUser(
    currentId,
    authId,
    updateUser: UpdateUserDto,
  ): Promise<boolean> {
    if (currentId === authId) {
      try {
        if (
          updateUser.currentPassword != null &&
          updateUser.newPassword != null
        ) {
          const user: User = await this.getUserById(authId);
          if (await user.validatePassword(updateUser.currentPassword)) {
            this.userRepo.update(
              { password: updateUser.newPassword },
              { where: { id: authId }, individualHooks: true },
            );
          } else {
            throw new BadRequestException('invalid password');
          }
        } else if (updateUser.email != null || updateUser.login != null) {
          if (updateUser.email != null) {
            if (this.checkUser(updateUser.email) != null) {
              throw new BadRequestException(
                'user with this email address already exists ',
              );
            }
          }
          await this.userRepo.update(
            { email: updateUser.email, login: updateUser.login },
            { where: { id: authId } },
          );
        } else {
          throw new BadRequestException('no data to change');
        }
        return true;
      } catch (exception) {
        if (exception instanceof HttpException) {
          throw new BadRequestException(exception.message);
        }
        console.log(exception);
        throw new BadRequestException('failed to change data');
      }
    } else {
      throw new ForbiddenException('user unauthorize');
    }
  }
}
