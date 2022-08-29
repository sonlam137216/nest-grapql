import { Types } from 'mongoose';
import { OrderStatusEnum } from '../../../common/constants/enum';
import { BaseEntity } from '../../../common/interfaces/baseEntity';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';

export interface IOrderItem {
  product: Types.ObjectId | string | Product;
  quantity: number;
}

export interface IOrder extends BaseEntity {
  totalPrice: number;
  status: OrderStatusEnum;
  shippingAddress: string;
  buyer: Types.ObjectId | string | User;
  orderItems: IOrderItem[];
}
