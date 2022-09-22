import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import PromocodesModule from './promocodes/promocodes.module';
import LoggerModule from './logger/logger.module';
import HttpLoggingInterceptor from './logger/interceptors/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    PromocodesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggingInterceptor,
    },
  ],
})
export default class AppModule {}
