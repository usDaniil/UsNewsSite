import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

import { TagNews } from '../../db/models/tagnews.model';
import { News } from '../news/news.model';

@Table
export class Tag extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  value: string;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @BelongsToMany(() => News, () => TagNews)
  news: News[];
}
