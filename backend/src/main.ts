import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as fs from 'fs';

async function bootstrap() {
  if (process.env.production) {
    console.log('process env production: ', process.env.production)
  }
  const httpsOptions = {
     key: fs.readFileSync(process.env.CERT_KEY),
     cert: fs.readFileSync(process.env.CERT_CHAIN),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    logger: console,
  });
  app.use(helmet());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
