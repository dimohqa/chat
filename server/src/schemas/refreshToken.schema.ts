import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';

export type RefreshTokenDocument = RefreshToken & mongoose.Document;

@Schema()
export class RefreshToken {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ type: Date, default: Date.now })
  created: Date;

  @Prop()
  token: string;

  @Prop()
  expires: Date;

  @Prop()
  revoked: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
