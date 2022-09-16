import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from '../product/product.service';
import {
  CreateOrderInput,
  OrderItemInput,
  UpdateOrderInput,
} from './dto/order.input';
import { Order, OrderResult } from './entities/order.entity';
import { OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly productService: ProductService,
  ) {}

  async getAll(userId: string): Promise<OrderResult> {
    const [results, totalCount] = await Promise.all([
      this.orderModel.find({ buyer: userId }).exec(),
      this.orderModel.countDocuments({ buyer: userId }).exec(),
    ]);

    return { results, totalCount };
  }

  async create(input: CreateOrderInput): Promise<Order> {
    if (input.orderItems.length === 0) {
      throw new BadRequestException('Order items is empty');
    }

    const productKey = 'product';
    const productIds = this.getListId(input.orderItems, productKey);

    await Promise.all[
      productIds.map(async (id) => {
        await this.productService.getById(id);
      })
    ];

    const totalPrice = await this.calPrice(input.orderItems);

    const order = new this.orderModel({ totalPrice, ...input });
    return await order.save();
  }

  async update(_id: string, input: UpdateOrderInput): Promise<Order> {
    const order = await this.orderModel
      .findByIdAndUpdate(_id, input)
      .setOptions({ overwrite: true, new: true });
    if (!order) {
      throw new NotFoundException(`Not find order with ID ${_id}`);
    }

    return order;
  }

  async delete(_id: string): Promise<boolean> {
    return (await this.orderModel.deleteOne({ _id }).exec()) ? true : false;
  }

  async calPrice(orderItems: OrderItemInput[]): Promise<number> {
    let totalPrice: number = 0;

    await Promise.all(
      orderItems.map(async (item) => {
        let product = await this.productService.getById(item.product as string);
        totalPrice += product.price * item.quantity;
        return item;
      }),
    );

    return totalPrice;
  }

  getListId(arr, key) {
    return arr.map((item) => item.key);
  }
}
