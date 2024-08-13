import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  description: string;

  @Column()
  stock: number;

  @Column('double precision')
  price: number;

  @Column({ length: 500, nullable: true })
  image: string;
}
