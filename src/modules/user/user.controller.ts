import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';

import { USER_UNAUTHORIZE } from '../../constants/errorMessange';
import { AuthGuard } from '../auth/auth.guard';
import { RequestUser } from '../auth/types/requestUser';

import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = (await this.userService.getUserById(id)).toJSON();
    delete user.password;
    return user;
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  async editUser(
    @Param('id', ParseIntPipe) id: number,
    @Request() auth: RequestUser,
    @Body() updateUser: UpdateUserDto,
  ) {
    if (id !== auth.user.id) throw new ForbiddenException(USER_UNAUTHORIZE);
    return this.userService.editUser(id, updateUser);
  }
}
