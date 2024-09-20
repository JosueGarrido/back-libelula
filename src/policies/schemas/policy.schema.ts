import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PolicyDocument = Policy & Document;

@Schema()
export class Policy {
  @Prop({ required: true })
  policyNumber: string;

  @Prop({ required: true })
  customerId: string; // Key al cliente

  @Prop({ required: true })
  details: string;

  @Prop({ required: true })
  entityId: string; // Key a la entidad
}

export const PolicySchema = SchemaFactory.createForClass(Policy);
