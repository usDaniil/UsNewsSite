import { Request } from '@nestjs/common';

import { UserDto } from '../../user/dto/user.dto';

export interface RequestUser extends Request {
  user: UserDto;
}
