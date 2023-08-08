import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './users';
import { TagsNews } from './tagsnews';
import { Tag } from './tags';

@Table
export class News extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  header?: string;

  @ForeignKey(() => User)
  @Column
  userId?: {
    allowNull: true;
    onDelete: 'CASCADE';
    references: {
      model: 'User';
      key: 'id';
    };
  };

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image?: string;

  @Column({
    type: DataType.TEXT,
  })
  text: string;

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

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Tag, () => TagsNews)
  tags: Tag[];
}
