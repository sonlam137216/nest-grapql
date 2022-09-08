import { InputType, Int, Field } from '@nestjs/graphql';
import { IUser } from '../interfaces/user';

@InputType()
export class CreateUserInput implements Partial<IUser> {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  confirmPassword: string;
}
