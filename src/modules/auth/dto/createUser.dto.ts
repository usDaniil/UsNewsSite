import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({
    message: 'no login',
  })
  login: string;

  @IsString()
  @IsNotEmpty({
    message: 'no password',
  })
  password: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty({
    message: 'no email',
  })
  email: string;
}
