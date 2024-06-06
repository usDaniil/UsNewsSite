import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import aiApiService from '../../common/service/aiAPI';

@Injectable()
export class OpenaiService {
  constructor(private configService: ConfigService) {}

  async getOpinion(newsText: string): Promise<string> {
    const response = await aiApiService.post('', {
      message: `перескажи кратко данный новостной текст: ${newsText}`,
      api_key: this.configService.get('OPENAI_API_KEY'),
    });
    //@ts-ignore
    return response.response;
  }
}
