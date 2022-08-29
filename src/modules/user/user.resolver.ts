import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@Resolver(User.name)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<string> {
    return this.userService.getAll();
  }

  @Query(() => User)
  async getUserByEmail(email: string): Promise<User> {
    return this.userService.getOneByEmail(email);
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.create(input);
  }
}
