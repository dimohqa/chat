import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ type: Date })
  age: Date;

  @Prop()
  city: string;

  @Prop({ default: '' })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({
  firstName: 'text',
  lastName: 'text',
});
