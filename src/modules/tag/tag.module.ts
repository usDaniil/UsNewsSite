import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Tag } from './tag.model';
import { TagService } from './tag.service';

@Module({
  providers: [TagService],
  exports: [TagService],
  imports: [SequelizeModule.forFeature([Tag])],
})
export class TagModule {}
