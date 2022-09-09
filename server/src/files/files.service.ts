import { FileUpload } from 'graphql-upload';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async saveImageOnServer(file: FileUpload) {
    try {
      const filename = uuid.v4() + '.jpg';

      const { createReadStream } = file;
      const filePath = path.resolve(__dirname, '..', 'static');

      new Promise((resolve, reject) =>
        createReadStream()
          .pipe(fs.createWriteStream(`${filePath}/${filename}`))
          .on('finish', () => resolve(true))
          .on('error', (error) => reject(error)),
      );

      return filename;
    } catch (error) {}
  }

  async deleteImageFromServer(fileName: string) {
    const filePath = path.resolve(__dirname, '..', 'static');
    await fs.unlink(`${filePath}/${fileName}`, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });
  }
}
