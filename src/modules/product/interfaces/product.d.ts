import { BaseEntity } from '../../../common/interfaces/baseEntity';

export interface IProduct extends BaseEntity {
  name: string;
  manufacturer: string;
  quantity: number;
  price: number;
}
