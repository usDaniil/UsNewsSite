import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { News } from '../news/news.model';

import { Tag } from './tag.model';

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
