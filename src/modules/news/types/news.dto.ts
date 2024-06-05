import { StreamableFile } from '@nestjs/common';
import { User } from 'src/modules/user/user.model';

export interface INews {
  id: number;
  header: string;
  userId: number;
  imagePath?: string;
  text: string;
  createAt: Date;
  user: User;
  updateAt: Date;
}

export interface CreateNews {
  header: string;
  userId: number;
  image?: Blob;
  text: string;
}
