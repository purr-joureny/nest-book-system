import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 全局应用 数据验证 数据类型转换
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // 支持跨域
  app.enableCors();
  // 将 uploads 目录设置为静态文件目录
  app.useStaticAssets(join(__dirname, '../uploads'), { prefix: '/uploads' });

  await app.listen(3000);
}
bootstrap();
