import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { Status } from './status.entity'; 

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Status)
  statusId: Status;

  @ManyToOne(() => Users)
  userId: Users;
}
