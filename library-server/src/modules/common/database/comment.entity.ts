import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LoanableItem } from './loanable-item.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LoanableItem, (loanableItem) => loanableItem.comments)
  item: LoanableItem;

  @Column()
  comment: string;
}
