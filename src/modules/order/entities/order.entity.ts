import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { OrderStatusEnum } from '../../../common/constants/enum';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';
import { IOrder, IOrderItem } from '../interfaces/order';

@ObjectType()
export class OrderItem implements IOrderItem {
  @Field(() => Product, { nullable: true })
  product: string | Product | Types.ObjectId;

  @Field(() => Int, { nullable: true })
  quantity: number;

  @Field(() => Number, { nullable: true })
  price: number;
}

@ObjectType()
export class Order implements IOrder {
  @Field(() => Number, { nullable: true })
  totalPrice: number;

  @Field(() => OrderStatusEnum, { nullable: true })
  status: OrderStatusEnum;

  @Field(() => String, { nullable: true })
  shippingAddress: string;

  @Field(() => User, { nullable: true })
  buyer: string | Types.ObjectId | User;

  @Field(() => [OrderItem], { nullable: true })
  orderItems: OrderItem[];

  @Field(() => String, { nullable: true })
  _id: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}

@ObjectType()
export class OrderResult {
  @Field(() => [Order], { nullable: true })
  results: Order[];

  @Field(() => Int, { nullable: true })
  totalCount: number;
}
