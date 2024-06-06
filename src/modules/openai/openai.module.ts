import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';

@Module({
  imports: [ConfigModule],
  providers: [OpenaiService],
  controllers: [OpenaiController],
})
export class OpenaiModule {}
