import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/user.input';
import { User } from './entities/user.entity';
import { UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getAll(): Promise<string> {
    return 'hello world';
  }

  async create(input: CreateUserInput): Promise<User> {
    const { email, password, username } = input;
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new BadRequestException('Email is ready taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new this.userModel({
      email,
      username,
      password: hashedPassword,
    });
    return await newUser.save();
  }

  async getOneByEmail(email: string): Promise<User> {
    const user = this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    return user;
  }

  async validateLogin(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Not found user');
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      throw new BadRequestException('Password does not match!');
    }

    return user;
  }
}
