import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfigService } from './config/appConfigService';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('VRILLAR FOMULA 1')
    .setDescription('The Fomula API description')
    .setVersion('1.0')
    .addTag('VRILLAR FOMULA 1')
    .build();
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('vrillarFomular1_api', app, document);
  const appConfigService = app.get<AppConfigService>(AppConfigService);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(appConfigService.port);
}
bootstrap();
