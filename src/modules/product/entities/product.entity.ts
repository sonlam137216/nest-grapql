import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IProduct } from '../interfaces/product';

@ObjectType()
export class Product implements Partial<IProduct> {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  manufacturer: string;

  @Field(() => Int, { nullable: true })
  quantity: number;

  @Field(() => Number, { nullable: true })
  price: number;

  @Field(() => String, { nullable: true })
  _id: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}

@ObjectType()
export class ProductResult {
  @Field(() => [Product], { nullable: true })
  results: Product[];

  @Field(() => Int, { nullable: true })
  totalCount: number;
}
