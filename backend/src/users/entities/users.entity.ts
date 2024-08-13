import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { DocumentType } from './document-type.entity';  

@Entity()
export class Users {
  @PrimaryColumn({ length: 15 })
  id: string;

  @Column({ length: 300 })
  name: string;

  @Column({ length: 200 })
  adress: string;

  @ManyToOne(() => DocumentType)
  documentType: DocumentType;
}
