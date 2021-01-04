import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Types, Document } from 'mongoose';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user: string;

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
