import { MongooseModule } from '@nestjs/mongoose';

export const mongooseConfig = MongooseModule.forRoot(
  `mongodb+srv://graphql.kq261ms.mongodb.net`,
  {
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
  },
);
