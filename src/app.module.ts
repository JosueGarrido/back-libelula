import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { EntitiesModule } from './entities/entities.module';
import { CustomersModule } from './customers/customers.module';
import { PoliciesModule } from './policies/policies.module';
import { QuotesModule } from './quotes/quotes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/prueba-back'),
    UsersModule,
    EntitiesModule,
    CustomersModule,
    PoliciesModule,
    QuotesModule,
    AuthModule,
  ],
})
export class AppModule {}
