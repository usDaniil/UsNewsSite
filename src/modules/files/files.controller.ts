import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Observable, of } from 'rxjs';

@Controller('file')
export class FileController {
  @Get(':fileName')
  getFile(@Param('fileName') fileName, @Res() res): Observable<object> {
    const file = join(process.cwd(), 'uploads', fileName);
    return of(res.sendFile(file));
  }
}
