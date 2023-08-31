import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserDto } from '../user/dto/user.dto';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

import { AuthUserDto } from './dto/authUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  createToken(id: number): string {
    return this.jwtService.sign({ id });
  }

  async register(request: CreateUserDto): Promise<AuthUserDto> {
    const existedUser = await this.userService.checkUser(request.email);
    if (existedUser != null)
      throw new BadRequestException('this user already exists');
    try {
      const createdUser = (
        await this.userService.createUser({ ...request })
      ).toJSON();
      delete createdUser.password;
      const token = this.createToken(createdUser.id);
      return { accessToken: token, user: createdUser };
    } catch (except) {
      throw new BadRequestException('user has not been created');
    }
  }

  async login(user: LoginUserDto): Promise<AuthUserDto> {
    const existedUser = await this.userService.checkUser(user.email);
    if (existedUser == null) throw new NotFoundException('user not found');
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
    const user = (await this.userService.findUser(id)).toJSON();
    delete user.password;
    return user;
  }
}
