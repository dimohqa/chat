import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import * as GridFsStorage from 'multer-gridfs-storage';
import { config } from '../../config';

const { mongoUri } = config;

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: GridFsStorage;

  constructor() {
    this.gridFsStorage = new GridFsStorage({
      url: mongoUri,
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          const filename = file.originalname.trim();
          const fileInfo = {
            filename: filename,
          };
          resolve(fileInfo);
        });
      },
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
