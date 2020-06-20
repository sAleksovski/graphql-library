import { LibraryItem } from 'modules/common';
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

  @ManyToOne(() => LibraryItem, (libraryItem) => libraryItem.events)
  item: LibraryItem;

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

  @ManyToOne(() => User, {
    nullable: true,
  })
  admin: User;

  @CreateDateColumn()
  createdAt: Date;
}
