import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import { News } from './news.model';
import { TagNews } from './tagnews.model';

@Table
export class Tag extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  title: string;

  @Column({
    type: DataType.DATE,
  })
  createdAt: {
    allowNull: false;
  };

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @BelongsToMany(() => News, () => TagNews)
  news: News[];
}
