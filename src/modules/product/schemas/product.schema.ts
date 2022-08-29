import { Document, Schema } from 'mongoose';
import { Product } from '../entities/product.entity';
import { IProduct } from '../interfaces/product';

export type ProductDocument = Product & Document;

export const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    manufacturer: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);
