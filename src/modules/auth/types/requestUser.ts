import { Request } from '@nestjs/common';

import { User } from '../../user/user.model';

export interface RequestUser extends Request {
  user: User;
}
