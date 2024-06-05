import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { createReadStream, ReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join, parse } from 'path';

import { CreateNews, INews } from './types/news.dto';
import { News } from './news.model';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAllNews(): Promise<News[]> {
    return this.newsService.findAllNews();
  }

  @Get(':id')
  findNewsById(@Param('id') id: number): Promise<News> {
    return this.newsService.findNewsById(id);
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          console.log(file);
          const filename = parse(file.originalname).name.concat(
            (Math.random() * 1000000000).toString(),
          );
          const extension = parse(file.originalname).ext;

          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  addNews(@UploadedFile() file, @Body() news): Promise<CreateNews> {
    return this.newsService.addNews({ ...news, imagePath: file.filename });
  }
}
