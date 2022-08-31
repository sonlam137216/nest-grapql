import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatusEnum {
  DRAFT = 'DRAFT',
  PAID = 'PAID',
  APPROVED = 'APPROVED',
  DELIVERING = 'DELIVERING',
  CANCELED = 'CANCELED',
}
registerEnumType(OrderStatusEnum, {
  name: 'OrderStatusEnum',
});
