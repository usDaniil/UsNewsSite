import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { parse } from 'path';

import { FORBIDDEN } from '../../constants/errorMessage';
import { AuthGuard } from '../auth/auth.guard';
import { RequestUser } from '../auth/types/requestUser';

import { UpdateUserDto } from './dto/updateUser.dto';
import { UploadUserDto } from './dto/userUpload.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserAndNewsById(id);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          console.log(file);
          const filename = parse(file.originalname).name.concat(
            (Math.random() * 1000000000).toString(),
          );
          const extension = parse(file.originalname).ext;

          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  async editUser(
    @Param('id', ParseIntPipe) id: number,
    @Request() auth: RequestUser,
    @Body() updateUser: UploadUserDto,
    @UploadedFile() file,
  ) {
    if (id !== auth.user.id) throw new ForbiddenException(FORBIDDEN);
    const { newPassword, currentPassword, login } = updateUser;
    return this.userService.editUser(id, {
      newPassword,
      currentPassword,
      login,
      avatarPath: file.filename,
    });
  }
}
