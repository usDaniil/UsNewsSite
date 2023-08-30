import { Request } from '@nestjs/common';

import { UserDto } from '../dto/user.dto';

export interface RequestUserDto extends Request {
  user: UserDto;
}
