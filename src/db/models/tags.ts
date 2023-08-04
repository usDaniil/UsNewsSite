import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class News extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
}
