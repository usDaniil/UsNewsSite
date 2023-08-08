import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';

import { Tag } from './tags.models.js';
import { News } from './news.models.js';

@Table
export class TagsNews extends Model {
  @ForeignKey(() => Tag)
  @Column
  tagId: number;

  @ForeignKey(() => News)
  @Column
  newsId: number;
}
