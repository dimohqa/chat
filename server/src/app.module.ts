import 'reflect-metadata';
import { join } from 'path';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { config } from './config';
import { AuthMiddleware } from './middlewares/auth.middlewares';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { User } from './schemas/user.schema';

const { mongoUri } = config;

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist', 'client'),
      renderPath: '*',
    }),
    AuthModule,
    UserModule,
    MongooseModule.forRoot(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserModule);
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
