import { Order } from '../entities/order.entity';
import { Document, Schema } from 'mongoose';
import { IOrder, IOrderItem } from '../interfaces/order';
import { OrderStatusEnum } from '../../../common/constants/enum';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';

export type OrderDocument = Order & Document;

export const OrderItemSchema = new Schema<IOrderItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: Product.name,
    autopopulate: true,
  },
  quantity: { type: Number, required: true },
});

export const OrderSchema = new Schema<IOrder>(
  {
    buyer: { type: Schema.Types.ObjectId, ref: User.name, autopopulate: true },
    shippingAddress: { type: String, required: true },
    totalPrice: { type: Number },
    status: {
      type: String,
      enum: Object.values(OrderStatusEnum),
      default: OrderStatusEnum.DRAFT,
    },
    orderItems: [
      {
        type: OrderItemSchema,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

OrderSchema.plugin(require('mongoose-autopopulate'));
