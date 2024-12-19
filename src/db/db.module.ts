import { DynamicModule, Module } from '@nestjs/common';
import { DbService } from './db.service';

export interface DbModuleOptions {
  path: string;
}
@Module({})
export class DbModule {
  static register(options: DbModuleOptions): DynamicModule {
    return {
      module: DbModule,
      // 由 Nest 注入器实例化的提供者, 并且可以至少在整个模块中共享
      providers: [
        {
          provide: 'OPTIONS',
          // 接收 options
          useValue: options,
        },
        DbService,
      ],
      // 共享模块
      exports: [DbService],
    };
  }
}
