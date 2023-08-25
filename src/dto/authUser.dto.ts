import { UserDto } from './user.dto';

export class AuthUserDto {
  accessToken: string;
  user: UserDto;
}
