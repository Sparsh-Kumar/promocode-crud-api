import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PromocodesController from './promocodes.controller';
import PromocodesService from './promocodes.service';
import PromocodesRepository from './promocodes.repository';
import { Promocode, PromocodeSchema } from './schemas/promocode.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Promocode.name, schema: PromocodeSchema },
    ]),
  ],
  controllers: [PromocodesController],
  providers: [
    PromocodesService,
    PromocodesRepository,
  ],
})
export default class PromocodesModule {}
