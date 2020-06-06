import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../modules/user';
import { LoanableItem } from './loanable-item.entity';

@Entity({
  orderBy: {
    createdAt: 'ASC',
  },
})
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LoanableItem, (loanableItem) => loanableItem.comments)
  item: LoanableItem;

  @Column()
  content: string;

  @ManyToOne(() => User)
  user: Promise<User>;

  @CreateDateColumn()
  createdAt: Date;
}
