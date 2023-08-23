import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/db/models/user.model';
import { AccessUser } from '../../dto/accessUser.dto';
import { CreateUser } from 'src/dto/createUser.dto';
import { UserAuth } from 'src/dto/userAuth.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userRepo: typeof User,
    private jwtService: JwtService,
  ) {}

  checkUser(email: string): Promise<User> {
    return this.userRepo.findOne({ where: { email } });
  }
  async register(request: CreateUser): Promise<AccessUser> {
    const existedUser = await this.checkUser(request.email);
    if (existedUser) throw new ConflictException();
    try {
      const createdUser = await this.userRepo.create({ request });
      const token = await this.getToken(createdUser.id);
      return { accessToken: token, user: createdUser };
    } catch (except) {
      throw new BadRequestException();
    }
  }

  async login(user: UserAuth): Promise<AccessUser> {
    const existedUser = await this.checkUser(user.email);
    const isPasswordValid = existedUser.validatePassword(user.password);
    if (!isPasswordValid) throw new BadRequestException();

    const token = await this.getToken(existedUser.id);
    return { accessToken: token, user: existedUser };
  }

  async getToken(id: number): Promise<string> {
    return this.jwtService.sign({ id });
  }
}
