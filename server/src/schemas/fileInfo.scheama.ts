import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileInfoVmDocument = FileInfoVm & Document;

@Schema()
export class FileInfoVm {
  @Prop()
  length: number;

  @Prop()
  chunkSize: number;

  @Prop()
  filename: string;

  @Prop()
  md5: string;

  @Prop()
  contentType: string;
}

export const FileInfoVmSchema = SchemaFactory.createForClass(FileInfoVm);
