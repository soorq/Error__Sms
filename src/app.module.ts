import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SMSRuModule } from 'node-sms-ru/nestjs';
import { SMSRu } from 'node-sms-ru';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SMSRuModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (cfg: ConfigService) => ({
        api_id: cfg.get<string>('API_KEY'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
