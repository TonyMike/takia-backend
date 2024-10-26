import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import clientConfig from './auth/config/client.config';
import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
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
    CategoryModule,
  ],

  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
