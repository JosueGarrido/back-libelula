import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'broker', 'cliente'] })
  role: string;

  @Prop({ required: true })
  entityId: string; // Key a la entidad a la que pertenece
}

export const UserSchema = SchemaFactory.createForClass(User);
