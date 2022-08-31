import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../modules/user/entities/user.entity';
import { UserService } from '../modules/user/user.service';
import { LoginInput } from './dto/auth.input';
import { LoginResponse } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserByPassword(input: LoginInput): Promise<LoginResponse> {
    const user = await this.userService.getOneByEmail(input.email);
    if (!user) {
      throw new NotFoundException('Not found User');
    }
    const token = this.createJwt(user);
    return {
      user,
      accessToken: token,
    };
  }

  async validateJwtPayload(loginInput: LoginInput): Promise<User> {
    const user = await this.userService.getOneByEmail(loginInput.email);
    if (!user) {
      throw new NotFoundException('Not found User');
    }
    return user;
  }

  createJwt(user: User): string {
    const data = {
      email: user.email,
      _id: user._id,
    };
    return this.jwtService.sign(data);
  }
}
