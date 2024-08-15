import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  createUser(@Body() body: any) {
    return this.usersService.createUser(body);
  }
}
