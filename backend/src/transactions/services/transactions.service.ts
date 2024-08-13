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

  findTransaccion(id: FindOneOptions<Transactions>) {
    return this.transactionsRepository.findOne(id);
  }

  createTransaccion(body: any) {
    const newTransaccion = this.transactionsRepository.create(body);
    return this.transactionsRepository.save(newTransaccion);
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
  
    transaccion.statusId = status;  // Asignas la instancia de Status
    return this.transactionsRepository.save(transaccion);
  }
  
}
