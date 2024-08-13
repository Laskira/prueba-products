import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  description: string;
}
