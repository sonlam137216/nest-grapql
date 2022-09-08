import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './dto/auth.input';
import { AuthenticationResponse } from './entities/auth.entity';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthenticationResponse)
  async login(
    @Args('input') input: LoginInput,
  ): Promise<AuthenticationResponse> {
    const result = await this.authService.validateUserByPassword(input);
    if (result) return result;

    throw new BadRequestException(
      'Could not log-in with the provided credentials',
    );
  }

  @Mutation(() => AuthenticationResponse)
  async register(
    @Args('input') input: RegisterInput,
  ): Promise<AuthenticationResponse> {
    return this.authService.register(input);
  }
}
