import { Request } from '@nestjs/common';

import { UserDto } from '../../user/dto/user.dto';

export interface RequestUserDto extends Request {
  user: UserDto;
}
