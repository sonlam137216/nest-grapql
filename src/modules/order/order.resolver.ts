import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order, OrderResult } from './entities/order.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { CreateOrderInput, UpdateOrderInput } from './dto/order.input';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => OrderResult)
  @UseGuards(JwtAuthGuard)
  async getAllOrderByUserId(@Args('id') id: string): Promise<OrderResult> {
    return this.orderService.getAll(id);
  }

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard)
  async createOrder(@Args('input') input: CreateOrderInput): Promise<Order> {
    return this.orderService.create(input);
  }

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard)
  async updateOrder(
    @Args('id') id: string,
    @Args('input') input: UpdateOrderInput,
  ): Promise<Order> {
    return this.orderService.update(id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteOrder(@Args('id') id: string): Promise<boolean> {
    return this.orderService.delete(id);
  }
}
