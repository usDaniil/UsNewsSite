import { UserDto } from '../../user/dto/user.dto';

export class AuthUserDto {
  accessToken: string;
  user: UserDto;
}
