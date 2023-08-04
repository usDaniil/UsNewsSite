import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class News extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tagId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  newsId: string;
}
