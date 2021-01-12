import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type FriendsDocument = Friends & Document;

@Schema()
export class Friends {
  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: User.name })
  friends: Types.ObjectId[];
}

export const FriendsSchema = SchemaFactory.createForClass(Friends);
