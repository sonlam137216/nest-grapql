import { StringExpression } from 'mongoose';

export interface BaseEntity {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
