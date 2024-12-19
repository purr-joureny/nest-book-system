import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { BookModule } from './book/book.module';

@Module({
  // 所有模块都要在 AppModule 中 imports
  // 导入一些模块的列表, 这些模块导出了此模块中所需的提供者
  imports: [UserModule, DbModule, BookModule],
  controllers: [AppController],
  // 
  providers: [AppService],
})
export class AppModule { }
