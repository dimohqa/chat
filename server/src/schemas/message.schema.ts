import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: User.name })
  author: Types.ObjectId;

  @Prop()
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
