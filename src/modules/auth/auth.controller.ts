import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UserDto } from '../user/dto/user.dto';

import { AuthUserDto } from './dto/authUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { RequestUser } from './types/requestUser';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: CreateUserDto): Promise<AuthUserDto> {
    return this.authService.register(data);
  }
  @Post('login')
  login(@Body() data: LoginUserDto): Promise<AuthUserDto> {
    return this.authService.login(data);
  }
  @UseGuards(AuthGuard)
  @Get('whoami')
  getUserByToken(@Request() auth: RequestUser): UserDto {
    return auth.user;
  }
}
