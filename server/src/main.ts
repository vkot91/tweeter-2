import { NestFactory } from '@nestjs/core';
import { NextFunction } from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import { TimeoutInterceptor } from 'interceptors/timeout';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.APP_PORT || 3000;
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  // app.useGlobalInterceptors(new TimeoutInterceptor());
  app.enableCors({ credentials: true });
  app.use((_req, _res, next: NextFunction) => {
    setTimeout(() => next(), 500);
  });
  await app.listen(PORT);
}
bootstrap();
