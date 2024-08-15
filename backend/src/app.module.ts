import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { DataSource } from 'typeorm';
import { Products } from './products/entities/products.entity';
import { Status } from './transactions/entities/status.entity';
import { Transactions } from './transactions/entities/transactions.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'payments',
        entities: [Products, Status, Transactions],
        synchronize: false,
        retryDelay: 3000,
        retryAttempts: 10,
      }),
      inject: [ConfigService],
    }),
    ProductsModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
