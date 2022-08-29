import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { LoginInput } from '../dto/auth.input';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret-key',
      ignoreExpiration: false,
    });
  }

  async validate(loginInput: LoginInput) {
    const user = await this.authService.validateJwtPayload(loginInput);
    if (!user) {
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials',
      );
    }

    return user;
  }
}
