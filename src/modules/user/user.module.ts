import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          UserSchema.pre('save', function (next) {
            console.log('pre save');
            return next();
          });

          return UserSchema;
        },
      },
    ]),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
