import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateProductInput,
  FilterProduct,
  UpdateProductInput,
} from './dto/product.input';
import { Cache } from 'cache-manager';
import { Product, ProductResult } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  @Query(() => ProductResult)
  async getAllProduct(
    @Args('page', { nullable: true, type: () => Int }) page: number = 0,
    @Args('size', { nullable: true, type: () => Int }) size: number = 50,
    @Args('filter', { nullable: true }) filter: FilterProduct,
  ): Promise<ProductResult> {
    const keyCache = 'all-product';
    try {
      const cachedValue: ProductResult = await this.cache.get(keyCache);

      if (cachedValue) {
        console.log('get from redis');
        return cachedValue;
      }

      const results = await this.productService.getAll(page, size, filter);

      await Promise.all([this.cache.set(keyCache, results)]);

      return results;
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Query(() => Product)
  async getProductById(@Args('id') id: string): Promise<Product> {
    return this.productService.getById(id);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('input') input: CreateProductInput,
  ): Promise<Product> {
    const keyCache = 'all-product';
    await this.cache.del(keyCache);
    return this.productService.create(input);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('input') input: UpdateProductInput,
  ): Promise<Product> {
    const keyCache = 'all-product';
    await this.cache.del(keyCache);
    return this.productService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id') id: string): Promise<boolean> {
    const keyCache = 'all-product';
    await this.cache.del(keyCache);
    return this.productService.delete(id);
  }
}
