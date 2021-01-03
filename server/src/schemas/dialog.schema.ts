import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Message } from './message.schema';
import { User } from './user.schema';

export type DialogDocument = Dialog & Document;

@Schema()
export class Dialog {
  @Prop({ type: [Types.ObjectId], ref: Message.name })
  messages: Message[];

  @Prop({ type: Types.ObjectId, ref: User.name })
  createdAt: User;

  @Prop({ type: [Types.ObjectId], ref: User.name })
  participants: User[];

  @Prop()
  name: string;
}

export const DialogSchema = SchemaFactory.createForClass(Dialog);
