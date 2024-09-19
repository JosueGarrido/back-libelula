import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuoteDocument = Quote & Document;

@Schema()
export class Quote {
  @Prop({ required: true })
  quoteNumber: string;

  @Prop({ required: true })
  customerId: string;  // Key al cliente 

  @Prop({ required: true })
  policyDetails: string;

  @Prop({ required: true })
  entityId: string;  // Key a la entidad
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
