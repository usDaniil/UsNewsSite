import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  login?: string;

  @IsOptional()
  @IsString()
  currentPassword?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  newPassword?: string;

  @IsOptional()
  @IsNotEmpty()
  image?: Blob;
}
