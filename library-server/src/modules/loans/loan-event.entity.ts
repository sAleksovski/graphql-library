import { LoanableItem } from 'modules/common';
import { User } from 'modules/user';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LoanEventType } from './loan.types';

@Entity({
  orderBy: {
    createdAt: 'ASC',
  },
})
export class LoanEvent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LoanableItem, (loanableItem) => loanableItem.events)
  item: LoanableItem;

  @Column({
    name: 'loan_type',
  })
  type: LoanEventType;

  @Column({
    nullable: true,
  })
  reason: string;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
