import 'reflect-metadata';
import { join } from 'path';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { config } from './config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AppGateway } from './app.gateway';
import { DialogModule } from './modules/dialog/dialog.module';

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
    DialogModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
