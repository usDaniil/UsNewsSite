import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateUserDto } from '../auth/dto/createUser.dto';

import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userRepo: typeof User,
  ) {}
  checkUser(email: string): Promise<User> {
    return this.userRepo.findOne({ where: { email } });
  }
  findUser(id: number): Promise<User> {
    return this.userRepo.findOne({ where: { id } });
  }
  createUser(request: CreateUserDto): Promise<User> {
    return this.userRepo.create({ ...request });
  }
}
