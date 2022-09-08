import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class RegisterInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  confirmPassword: string;
}
