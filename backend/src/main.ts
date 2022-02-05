import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as csurf from 'csurf';
import * as session from 'express-session';

import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

const mircoserivceOptions = {
  transport: Transport.REDIS,
  options: {
    url: 'redis://localhost:6379'
  }
}

function getCorsArray(list: string): string[] {
  if (!list) {
    throw 'You need to include CORS_WHITELIST in your .env'
  }
  return list.split(',').map((item) => item.trim());
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: {
    origin: true,
    preflightContinue: false,
  }});
  // app.enableCors();
  // app.use(csurf());
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  )
  await app.listen(5000);
}
bootstrap();

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//     AppModule,
//     {
//       transport: Transport.REDIS,
//       options: {
//         url: 'redis://localhost:6379'
//       }  
//     }
//     ,
//   );
//   // app.use(csurf());
//   app.useGlobalPipes(new ValidationPipe());
//   app.use(
//     session({
//       secret: 'my-secret',
//       resave: false,
//       saveUninitialized: false,
//     }),
//   )
//   await app.listen();
// }
// bootstrap();

// app.enableCors({ origin: getCorsArray(configService.get('CORS_WHITELIST')) });


