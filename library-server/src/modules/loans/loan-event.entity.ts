import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LoanableItem } from '../common';

@Entity()
export class LoanEvent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LoanableItem, (loanableItem) => loanableItem.events)
  item: LoanableItem;
}
