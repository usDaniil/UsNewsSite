import { Body, Controller, Post } from '@nestjs/common';

import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('opinion')
  async getOpinion(@Body('newsText') newsText: string): Promise<string> {
    return this.openaiService.getOpinion(newsText);
  }
}
