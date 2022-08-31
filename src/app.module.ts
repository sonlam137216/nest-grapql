import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongooseConfig } from './configs/mongoose.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { REDIS_CACHE_OPTIONS } from './configs/redis.config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    mongooseConfig,
    UserModule,
    AuthModule,
    ProductModule,
    OrderModule,
    CacheModule.register({
      ...REDIS_CACHE_OPTIONS,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
