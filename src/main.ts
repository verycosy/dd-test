import tracer from 'dd-trace';
tracer.init();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as rTracer from 'cls-rtracer';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { createLogTransports } from './utils/logger/createLogTransports';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: createLogTransports(),
    }),
  });

  app.use(rTracer.expressMiddleware());

  await app.listen(3001);

  const logger = new Logger('Application');
  logger.log(`sample server running on 3001`);
}
bootstrap();
