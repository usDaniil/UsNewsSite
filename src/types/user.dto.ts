export interface IUser {
  id: number;
  email: string;
  login: string;
  password: string;
  avatarPath?: string;
  createAt: Date;
  updateAt: Date;
}
