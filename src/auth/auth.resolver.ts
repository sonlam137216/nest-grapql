import { BadRequestException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/auth.input';
import { LoginResponse } from './entities/auth.entity';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginResponse)
  async login(@Args('input') input: LoginInput): Promise<LoginResponse> {
    const result = await this.authService.validateUserByPassword(input);
    if (result) return result;

    throw new BadRequestException(
      'Could not log-in with the provided credentials',
    );
  }
}
