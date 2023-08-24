import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/db/models/user.model';
import { AccessUser } from '../../dto/accessUser.dto';
import { CreateUser } from 'src/dto/createUser.dto';
import { UserLogin } from 'src/dto/userLogin.dto';
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
    if (existedUser) throw new ConflictException('this user already exists');
    try {
      const createdUser = await this.userRepo.create({ ...request });
      delete createdUser.dataValues['password'];
      const token = await this.getToken(createdUser.id);
      return { accessToken: token, user: createdUser };
    } catch (except) {
      throw new BadRequestException();
    }
  }

  async login(user: UserLogin): Promise<AccessUser> {
    const existedUser = await this.checkUser(user.email);
    if (!existedUser) throw new NotFoundException('user not found');
    const isPasswordValid = await existedUser.validatePassword(user.password);
    if (!isPasswordValid) throw new BadRequestException('invalid password');
    const token = await this.getToken(existedUser.id);
    delete existedUser.dataValues['password'];
    return { accessToken: token, user: existedUser };
  }
  async tokenAuth(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    delete user.dataValues['password'];
    return user;
  }
  async getToken(id: number): Promise<string> {
    return this.jwtService.sign({ id });
  }
}
