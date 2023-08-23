import { IsNotEmpty } from 'class-validator';

export class UserAuth {
  @IsNotEmpty({
    message: 'no password',
  })
  password: string;
  @IsNotEmpty({
    message: 'no email',
  })
  email: string;
}
