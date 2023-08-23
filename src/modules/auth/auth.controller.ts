import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AccessUser } from 'src/dto/accessUser.dto';
import { CreateUser } from 'src/dto/createUser.dto';
import { UserAuth } from 'src/dto/userAuth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() req: CreateUser): Promise<AccessUser> {
    return this.authService.register(req);
  }
  @Post('login')
  login(@Body() req: UserAuth): Promise<AccessUser> {
    return this.authService.login(req);
  }
}
