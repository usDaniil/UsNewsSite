import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../../db/models/user.model';
import { CreateUserDto } from '../../dto/createUser.dto';
import { LoginUserDto } from '../../dto/loginUser.dto';
import { AuthUserDto } from '../../dto/authUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userRepo: typeof User,
    private jwtService: JwtService,
  ) {}

  async createToken(id: number): Promise<string> {
    return this.jwtService.sign({ id });
  }

  checkUser(email: string): Promise<User> {
    return this.userRepo.findOne({ where: { email } });
  }

  async register(request: CreateUserDto): Promise<AuthUserDto> {
    const existedUser = await this.checkUser(request.email);
    if (existedUser) throw new BadRequestException('this user already exists');
    try {
      const createdUser = (await this.userRepo.create({ ...request })).toJSON();
      delete createdUser.dataValues['password'];
      const token = await this.createToken(createdUser.id);
      return { accessToken: token, user: createdUser };
    } catch (except) {
      throw new BadRequestException('user has not been created');
    }
  }

  async login(user: LoginUserDto): Promise<AuthUserDto> {
    const existedUser = await this.checkUser(user.email);
    if (!existedUser) throw new NotFoundException('user not found');
    const isPasswordValid = await existedUser.validatePassword(user.password);
    if (!isPasswordValid) throw new BadRequestException('invalid password');
    const token = await this.createToken(existedUser.id);
    delete existedUser.dataValues['password'];
    return { accessToken: token, user: existedUser };
  }
  async getUserByToken(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    delete user.dataValues['password'];
    return user;
  }
}
