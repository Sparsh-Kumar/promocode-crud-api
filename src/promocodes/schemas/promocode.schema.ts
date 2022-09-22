import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PromocodeStatus, PromotionType } from '../types';

@Schema()
export class Promocode {
  @Prop({
    unique: true,
    required: true,
    min: 1,
    max: 100,
  })
    name: string;

  @Prop({
    required: true,
  })
    discount: number;

  @Prop({
    required: true,
  })
    status: PromocodeStatus;

  @Prop({
    required: true,
  })
    type: PromotionType;

  @Prop({
    required: true,
  })
    startDate: Date;

  @Prop({
    required: true,
  })
    endDate: Date;
}

export const PromocodeSchema = SchemaFactory.createForClass(Promocode);
export type PromocodeDocument = Promocode & Document;
