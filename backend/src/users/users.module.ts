import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}