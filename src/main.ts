import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/UsersLogger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import { config as Auth0Config } from './database/config/auth0';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('ecommerce - nechodev API')
    .setDescription(
      'Ecommerce demo with NestJS for SoyHenry Bootcamp Module 4 project',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  try {
    app.use(auth(Auth0Config));
  } catch (error) {
    console.error('Error configuring Auth0:', error);
    process.exit(1);
  }

  const loggerMiddleware = new LoggerMiddleware();
  app.use(loggerMiddleware.use);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
