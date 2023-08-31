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
import { UserDto } from '../../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userRepo: typeof User,
    private jwtService: JwtService,
  ) {}

  createToken(id: number): string {
    return this.jwtService.sign({ id });
  }

  checkUser(email: string): Promise<User> {
    return this.userRepo.findOne({ where: { email } });
  }

  async register(request: CreateUserDto): Promise<AuthUserDto> {
    const existedUser = await this.checkUser(request.email);
    if (existedUser != null && existedUser != undefined)
      throw new BadRequestException('this user already exists');
    try {
      const createdUser = (await this.userRepo.create({ ...request })).toJSON();
      delete createdUser.password;
      const token = this.createToken(createdUser.id);
      return { accessToken: token, user: createdUser };
    } catch (except) {
      throw new BadRequestException('user has not been created');
    }
  }

  async login(user: LoginUserDto): Promise<AuthUserDto> {
    const existedUser = await this.checkUser(user.email);
    if (existedUser == null || existedUser == undefined)
      throw new NotFoundException('user not found');
    const isPasswordValid: boolean = await existedUser.validatePassword(
      user.password,
    );
    if (!isPasswordValid) throw new BadRequestException('invalid password');
    const token = this.createToken(existedUser.id);
    const userJson = existedUser.toJSON();
    delete userJson.password;
    return { accessToken: token, user: userJson as UserDto };
  }
  async getUserByToken(id: number): Promise<User> {
    const user = (await this.userRepo.findOne({ where: { id } })).toJSON();
    delete user.password;
    return user;
  }
}
