import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  Length,
  BeforeCreate,
} from 'sequelize-typescript';
import hasher from 'bcrypt';

import { News } from './news.models';

const SALT = process.env.SALT;
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

  @Length({ min: 0, max: 255 })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @BeforeCreate
  static async hashPassword(instance: User) {
    instance.password = await hasher.hash(instance.password, SALT);
  }

  async compare(password: string): Promise<boolean> {
    return await hasher.compare(password, this.password);
  }

  @Column({
    type: DataType.STRING,
  })
  avatar?: string;

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
