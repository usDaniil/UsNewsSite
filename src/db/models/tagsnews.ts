import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Tag } from './tags';
import { News } from './news';

@Table
export class TagsNews extends Model {
  @ForeignKey(() => Tag)
  @Column
  tagId: number;

  @ForeignKey(() => News)
  @Column
  newsId: number;
}
