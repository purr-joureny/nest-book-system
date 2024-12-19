// eslint-disable-next-line prettier/prettier
// class-validator 校验规则
import { IsNotEmpty, MinLength } from 'class-validator';
// (Data Transfer Object) 特殊类 用于定义数据的结构和验证规则
export class LoginUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码最少6位' })
  password: string;
}
