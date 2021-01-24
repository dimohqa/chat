import 'reflect-metadata';
import { join } from 'path';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AppGateway } from './app.gateway';
import { DialogModule } from './modules/dialog/dialog.module';
import { FriendsModule } from './modules/friends/friends.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

const envFilePath = join('..', '.env.development');

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist', 'client'),
      renderPath: '*',
    }),
    ConfigModule.forRoot({
      envFilePath: envFilePath,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: envFilePath,
        }),
      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
    }),
    AuthModule,
    UserModule,
    DialogModule,
    FriendsModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
