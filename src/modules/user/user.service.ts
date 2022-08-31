import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/user.input';
import { User } from './entities/user.entity';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getAll(): Promise<string> {
    return 'hello world';
  }

  async create(input: CreateUserInput): Promise<User> {
    const newUser = new this.userModel(input);
    return await newUser.save();
  }

  async getOneByEmail(email: string): Promise<User> {
    const user = this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    return user;
  }
}
