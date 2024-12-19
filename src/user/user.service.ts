import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
// 规则 和 校验
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  // 注入 DbService 处理 写入数据
  @Inject(DbService)
  dbService: DbService;

  // 注册
  async register(registerUserDto: RegisterUserDto) {
    // read 处理数据
    const users: User[] = await this.dbService.read();

    const foundUser = users.find(
      (item) => item.username === registerUserDto.username,
    );

    if (foundUser) {
      throw new BadRequestException('该用户已注册');
    }

    const user = new User();
    user.username = registerUserDto.username;
    user.password = registerUserDto.password;
    users.push(user);

    await this.dbService.write(users);
    return user;
  }

  // 登录
  async login(loginUserDto: LoginUserDto) {
    console.log('loginUserDto', loginUserDto)
    const users: User[] = await this.dbService.read()

    const foundUser = users.find(item => item.username === loginUserDto.username)
    console.log('login foundUser', foundUser)
    if (!foundUser) {
      throw new BadRequestException('用户不存在')
    }

    if (foundUser.password !== loginUserDto.password) {
      throw new BadRequestException('密码不正确')
    }

    return foundUser
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
