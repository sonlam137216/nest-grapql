import { Schema } from 'mongoose';
import { User } from '../entities/user.entity';
import { IUser } from '../interfaces/user';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
