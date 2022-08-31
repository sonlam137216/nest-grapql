import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { OrderStatusEnum } from '../../../common/constants/enum';
import { IOrder, IOrderItem } from '../interfaces/order';

@InputType()
export class OrderItemInput implements Partial<IOrderItem> {
  @Field(() => ID)
  product: string | Types.ObjectId;

  @Field(() => Int)
  quantity: number;
}

@InputType()
export class CreateOrderInput implements Partial<IOrder> {
  @Field(() => OrderStatusEnum, { nullable: true })
  status: OrderStatusEnum;

  @Field(() => String)
  shippingAddress: string;

  @Field(() => ID)
  buyer: string | Types.ObjectId;

  @Field(() => [OrderItemInput])
  orderItems: OrderItemInput[];
}

@InputType()
export class UpdateOrderInput implements Partial<IOrder> {
  @Field(() => Number, { nullable: true })
  totalPrice: number;

  @Field(() => OrderStatusEnum, { nullable: true })
  status: OrderStatusEnum;

  @Field(() => String)
  shippingAddress: string;

  @Field(() => ID)
  buyer: string | Types.ObjectId;

  @Field(() => [OrderItemInput])
  orderItems: OrderItemInput[];
}
