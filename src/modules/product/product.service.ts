import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateProductInput,
  FilterProduct,
  UpdateProductInput,
} from './dto/product.input';
import { Product, ProductResult } from './entities/product.entity';
import { ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getAll(
    page: number,
    size: number,
    filter: FilterProduct,
  ): Promise<ProductResult> {
    const [results, totalCount] = await Promise.all([
      this.productModel
        .find(filter)
        .limit(size)
        .skip(page * size)
        .exec(),
      this.productModel.countDocuments(filter).exec(),
    ]);

    return { results, totalCount };
  }

  async getById(_id: string): Promise<Product> {
    const product = await this.productModel.findOne({ _id }).exec();
    if (!product) {
      throw new NotFoundException(`Not found product with ID ${_id}`);
    }

    return product;
  }

  async create(input: CreateProductInput): Promise<Product> {
    const product = new this.productModel(input);
    return await product.save();
  }

  async update(_id: string, input: UpdateProductInput): Promise<Product> {
    const product = await this.productModel
      .findByIdAndUpdate(_id, input)
      .setOptions({ overwrite: true, new: true });
    if (!product) {
      throw new NotFoundException(`Not find product with ID ${_id}`);
    }

    return product;
  }

  async delete(_id: string): Promise<boolean> {
    return (await this.productModel.deleteOne({ _id }).exec()) ? true : false;
  }
}
