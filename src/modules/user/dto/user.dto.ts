export class UserDto {
  id: number;
  login: string;
  email: string;
  avatarPath?: string;
  createdAt: Date;
  updatedAt: Date;
}
