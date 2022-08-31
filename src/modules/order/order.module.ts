import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { OrderSchema } from './schemas/order.schema';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Order.name,
        useFactory: () => {
          OrderSchema.pre('save', function (next) {
            console.log('pre save');
            return next();
          });
          return OrderSchema;
        },
      },
    ]),
    ProductModule,
  ],
  providers: [OrderResolver, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
