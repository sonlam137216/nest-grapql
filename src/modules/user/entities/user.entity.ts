import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IUser } from '../interfaces/user';

@ObjectType()
export class User implements IUser {
  @Field(() => String, { nullable: true })
  username: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  _id: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
