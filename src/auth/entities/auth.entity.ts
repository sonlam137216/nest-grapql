import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../modules/user/entities/user.entity';

@ObjectType()
export class Auth {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

@ObjectType()
export class LoginResponse {
  @Field(() => String, { nullable: true })
  accessToken: string;

  @Field(() => User, { nullable: true })
  user: User;
}
