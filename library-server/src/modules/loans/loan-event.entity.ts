import { LoanableItem } from 'modules/common';
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LoanEvent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LoanableItem, (loanableItem) => loanableItem.events)
  item: LoanableItem;
}
