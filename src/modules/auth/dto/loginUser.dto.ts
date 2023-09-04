import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({
    message: 'no password',
  })
  password: string;

  @IsEmail()
  @IsNotEmpty({
    message: 'no email',
  })
  email: string;
}
