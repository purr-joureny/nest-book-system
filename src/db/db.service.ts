import { Inject, Injectable } from '@nestjs/common';
import { DbModuleOptions } from './db.module';
// fs 模块 中的 promises 版本
import { access, readFile, writeFile } from 'fs/promises';

@Injectable()

export class DbService {
  // Inject 注入器 'OPTIONS' 为字符串标识 通常用于标识某个特定的配置服务
  @Inject('OPTIONS')
  private options: DbModuleOptions;

  async read() {
    // 获取 path 参数字段
    const filePath = this.options.path;

    try {
      // 成功则返回 获取到的 path
      await access(filePath);
    } catch (e) {
      // 否则返回空数组
      return [];
    }
    // readFile 读取文件内容的函数 接收 filePath 参数 返回一个 promise
    const str = await readFile(filePath, {
      encoding: 'utf-8',
    });

    if (!str) {
      return [];
    }

    return JSON.parse(str);
  }

  async write(obj: Record<string, any>) {
    // 用于将数据写入文件函数 接收两个参数: filePath 文件路径; data 要写入的数据
    await writeFile(this.options.path, JSON.stringify(obj || []), {
      encoding: 'utf-8',
    });
  }
}
