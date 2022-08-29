import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          ProductSchema.pre('save', function (next) {
            console.log('pre save');
            return next();
          });
          return ProductSchema;
        },
      },
    ]),
  ],
  providers: [ProductResolver, ProductService],
  exports: [ProductService],
})
export class ProductModule {}
