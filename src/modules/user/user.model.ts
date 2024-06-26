import * as bcrypt from 'bcrypt';
import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  HasMany,
  Length,
  Model,
  Table,
} from 'sequelize-typescript';

import { News } from '../news/news.model';

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
  @BeforeUpdate
  static async hashPassword(instance: User) {
    instance.password = await bcrypt.hash(
      instance.password,
      parseInt(process.env.SALT_ROUND),
    );
  }

  validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
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
