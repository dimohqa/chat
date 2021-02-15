import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.use(cookieParser());

  // app.use((req, res, next) => {
  //   if (req.path.length > 1 && /\/$/.test(req.path)) {
  //     const query = req.url.slice(req.path.length);
  //     res.redirect(301, req.path.slice(0, -1) + query);
  //   } else {
  //     next();
  //   }
  // });

  await app.listen(config.get('PORT'));
}
bootstrap();
