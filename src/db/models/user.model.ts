import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  Length,
  BeforeCreate,
} from 'sequelize-typescript';
import bcrypt from 'bcrypt';

import { News } from './news.model';

@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  login: string;

  @Length({ min: 6, max: 255 })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @BeforeCreate
  static async hashPassword(instance: User) {
    instance.password = await bcrypt.hash(instance.password, process.env.SALT);
  }

  async validationPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  @Column({
    type: DataType.STRING,
  })
  avatarPath: string;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @HasMany(() => News)
  news: News[];
}
