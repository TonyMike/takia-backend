import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import clientConfig from './auth/config/client.config';
import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import * as path from 'path';
@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      load: [clientConfig],
      isGlobal: true,
      cache: true,
      envFilePath: path.resolve(process.cwd(), '.env'),
    }),
    ProductsModule,
  ],

  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
