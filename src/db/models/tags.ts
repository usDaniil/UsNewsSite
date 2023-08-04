import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import { News } from './news';
import { TagsNews } from './tagsnews';

@Table
export class Tag extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @BelongsToMany(() => News, () => TagsNews)
  news: News[];
}
