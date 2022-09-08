import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../modules/user/entities/user.entity';
import { UserService } from '../modules/user/user.service';
import { LoginInput, RegisterInput } from './dto/auth.input';
import { AuthenticationResponse } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserByPassword(
    input: LoginInput,
  ): Promise<AuthenticationResponse> {
    const user = await this.userService.validateLogin(
      input.email,
      input.password,
    );
    if (!user) {
      throw new NotFoundException('Not found User');
    }
    const accessToken = this.createAccessToken(user);
    return {
      user,
      accessToken,
    };
  }

  async register(input: RegisterInput): Promise<AuthenticationResponse> {
    try {
      const user = await this.userService.create(input);
      const accessToken = this.createAccessToken(user);
      const refreshToken = this.createRefreshToken(user);

      return {
        user,
        accessToken,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateJwtPayload(loginInput: LoginInput): Promise<User> {
    const user = await this.userService.getOneByEmail(loginInput.email);
    if (!user) {
      throw new NotFoundException('Not found User');
    }
    return user;
  }

  createAccessToken(user: User): string {
    const data = {
      email: user.email,
      _id: user._id,
    };
    return this.jwtService.sign(data);
  }

  createRefreshToken(user: User): string {
    const data = {
      email: user.email,
      _id: user._id,
    };
    return this.jwtService.sign(data);
  }
}
