import { User } from 'src/db/models/user.model';

export class AccessUser {
  accessToken: string;
  user: User;
}
