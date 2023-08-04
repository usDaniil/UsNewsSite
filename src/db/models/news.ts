import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class News extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  header: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  author: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

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
}
