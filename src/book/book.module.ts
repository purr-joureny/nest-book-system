import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DbModule } from 'src/db/db.module';
// 虽然 book.controller 已经就绪可以使用, 但是 Nest 依然不知道 book.controller 是否存在
// 所以它不会创建这个类的一个实例
// 控制器总是属于模块
// 比如 book.controller 控制器 
// 这就是我们为什么在 @Module 装饰器中包含 book.controller 数组的原因
@Module({
  imports: [
    DbModule.register({
      path: 'books.json'
    })
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule { }
