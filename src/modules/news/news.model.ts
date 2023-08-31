import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { TagNews } from '../../db/models/tagnews.model';
import { Tag } from '../tag/tag.model';
import { User } from '../user/user.model';

@Table
export class News extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  header: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @Column({
    type: DataType.STRING,
  })
  imagePath?: string;

  @Column({
    type: DataType.TEXT,
  })
  text: string;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Tag, () => TagNews)
  tags: Tag[];
}
