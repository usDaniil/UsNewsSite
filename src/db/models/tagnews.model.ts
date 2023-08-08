import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';

import { Tag } from './tag.model';
import { News } from './news.model';

@Table
export class TagNews extends Model {
  @ForeignKey(() => Tag)
  @Column
  tagId: number;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @ForeignKey(() => News)
  @Column
  newsId: number;
}
