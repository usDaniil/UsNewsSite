import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  header: string;

  @IsString()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsOptional()
  imagePath?: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
