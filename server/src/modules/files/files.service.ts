import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { FileInfoVm, FileInfoVmDocument } from '../../schemas/fileInfo.scheama';
import { Connection, Model } from 'mongoose';
import { MongoGridFS } from 'mongo-gridfs';
import { GridFSBucketReadStream } from 'mongodb';

@Injectable()
export class FilesService {
  private fileModel: MongoGridFS;

  constructor(
    @InjectModel(FileInfoVm.name)
    private fileInfoVmModel: Model<FileInfoVmDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.fileModel.readFileStream(id);
  }

  async findInfo(id: string): Promise<FileInfoVm> {
    const result: FileInfoVm = await this.fileInfoVmModel
      .findById(id)
      .catch((err) => {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      });

    return {
      filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      md5: result.md5,
      contentType: result.contentType,
    };
  }

  async deleteFile(id: string): Promise<boolean> {
    return await this.fileModel.delete(id);
  }
}
