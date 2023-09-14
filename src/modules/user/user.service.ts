import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  FAILED_TO_CHANGE_DATA,
  INVALID_PASSWORD,
  NO_EDIT_DATA,
  USER_UNAUTHORIZE,
} from 'src/constants/errorMessange';

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
    { login, newPassword, currentPassword }: UpdateUserDto,
  ): Promise<User> {
    if (currentId !== authId) throw new ForbiddenException(USER_UNAUTHORIZE);

    if (login == null && newPassword == null)
      throw new BadRequestException(NO_EDIT_DATA);

    try {
      const user: User = await this.getUserById(authId);
      if (currentPassword != null && newPassword != null) {
        if (!(await user.validatePassword(currentPassword)))
          throw new BadRequestException(INVALID_PASSWORD);
        this.userRepo.update(
          { password: newPassword },
          { where: { id: authId }, individualHooks: true },
        );
      }
      if (login != null) {
        this.userRepo.update({ login }, { where: { id: authId } });
      }
      const userJson = user.toJSON();
      userJson.login = login;
      delete userJson.password;
      return userJson;
    } catch (exception) {
      if (exception instanceof HttpException) {
        throw new BadRequestException(exception.message);
      }
      throw new BadRequestException(FAILED_TO_CHANGE_DATA);
    }
  }
}
