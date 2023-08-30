import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthUserDto } from '../../dto/authUser.dto';
import { CreateUserDto } from '../../dto/createUser.dto';
import { LoginUserDto } from '../../dto/loginUser.dto';
import { UserDto } from '../../dto/user.dto';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RequestUserDto } from 'src/types/requestUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() req: CreateUserDto): Promise<AuthUserDto> {
    return this.authService.register(req);
  }
  @Post('login')
  login(@Body() data: LoginUserDto): Promise<AuthUserDto> {
    return this.authService.login(data);
  }
  @UseGuards(AuthGuard)
  @Get('whoami')
  getUserByToken(@Request() auth: RequestUserDto): UserDto {
    return auth.user;
  }
}
