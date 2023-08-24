import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AccessUser } from 'src/dto/accessUser.dto';
import { CreateUser } from 'src/dto/createUser.dto';
import { UserLogin } from 'src/dto/userLogin.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() req: CreateUser): Promise<AccessUser> {
    return this.authService.register(req);
  }
  @Post('login')
  login(@Body() req: UserLogin): Promise<AccessUser> {
    return this.authService.login(req);
  }
  @UseGuards(AuthGuard)
  @Get('/whoami')
  tokenAuth(@Request() req) {
    return req.user;
  }
}
