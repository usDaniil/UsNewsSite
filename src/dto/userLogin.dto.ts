import { IsNotEmpty } from 'class-validator';

export class UserLogin {
  @IsNotEmpty({
    message: 'no password',
  })
  password: string;
  @IsNotEmpty({
    message: 'no email',
  })
  email: string;
}
