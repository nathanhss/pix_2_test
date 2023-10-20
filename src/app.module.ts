import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';
import { Module } from '@nestjs/common';
import { TransporterModule } from '@transporter/transporter.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    HttpModule,
    TransporterModule,
  ],
})
export class AppModule {}
