import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { TransporterService } from './transporter/transporter.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const messageService = app.get<TransporterService>(TransporterService);
  app.connectMicroservice(messageService.getOptions('pix_2'));

  const config = new DocumentBuilder()
    .setTitle('Pix 2')
    .setDescription(
      'Projeto desenvolvido como teste técnico para cargo de Desenvolvedor NodeJS - Pleno',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.startAllMicroservices();
  await app.listen(3001);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();
