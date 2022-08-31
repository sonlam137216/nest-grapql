import { BaseEntity } from '../../../common/interfaces/baseEntity';

export interface IUser extends BaseEntity {
  username: string;
  password: string;
  email: string;
}
