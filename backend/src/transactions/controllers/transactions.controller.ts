import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { TransactionsService } from '../services/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get(':id')
  getTransaction(@Param('id') id: number) {
    return this.transactionsService.findTransaccion({ where: { id } });
  }

  @Post()
  createTransaction(@Body() body: any) {
    return this.transactionsService.createTransaccion(body);
  }

  @Patch(':id/status')
  updateTransactionStatus(
    @Param('id') id: number,
    @Body('statusId') statusId: number,
  ) {
    return this.transactionsService.updateTransaccionStatus(id, statusId);
  }

  @Post('process-payment')
  async processPayment(@Body() paymentData: any) {
    return this.transactionsService.processPayment(paymentData);
  }
}
