import { Injectable } from '@nestjs/common';
import { Transactions } from '../entities/transactions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Status } from '../entities/status.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepository: Repository<Transactions>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async findTransaccion(id: FindOneOptions<Transactions>) {
    return this.transactionsRepository.findOne(id);
  }

  async createTransaccion(body: any) {
    const newTransaccion = this.transactionsRepository.create(body);
    const savedTransaction = await this.transactionsRepository.save(newTransaccion);
    return savedTransaction;
  }

  async updateTransaccionStatus(id: number, statusId: number) {
    const transaccion = await this.transactionsRepository.findOne({
      where: { id },
      relations: ['statusId'],
    });
  
    if (!transaccion) {
      throw new Error(`Transaction with ID ${id} not found`);
    }
  
    const status = await this.statusRepository.findOne({ where: { id: statusId } });
    if (!status) {
      throw new Error(`Status with ID ${statusId} not found`);
    }
  
    transaccion.statusId = status; 
    return this.transactionsRepository.save(transaccion);
  }

  async processPayment(paymentData: any) {
    const statusId = 1; 
    const transactionData = {
      statusId,
      userId: paymentData.userId,
      // otros datos relevantes
    };
    
    const savedTransaction = await this.createTransaccion(transactionData);

    await this.updateTransaccionStatus(savedTransaction[0].id, statusId); 
    return savedTransaction;
  }
}
