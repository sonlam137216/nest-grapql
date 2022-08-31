import { Field, InputType, Int } from '@nestjs/graphql';
import { IProduct } from '../interfaces/product';

@InputType()
export class CreateProductInput implements Partial<IProduct> {
  @Field(() => String)
  name: string;

  @Field(() => String)
  manufacturer: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Number)
  price: number;
}

@InputType()
export class UpdateProductInput implements Partial<IProduct> {
  @Field(() => String)
  name: string;

  @Field(() => String)
  manufacturer: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Number)
  price: number;
}

@InputType()
export class FilterProduct implements Partial<IProduct> {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  manufacturer: string;
}
