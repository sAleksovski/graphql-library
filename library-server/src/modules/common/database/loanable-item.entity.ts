import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { LoanEvent } from '../../loans/loan-event.entity';
import { Comment } from './comment.entity';

@Entity()
@TableInheritance({
  column: {
    type: 'string',
    name: 'type',
  },
})
export class LoanableItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => LoanEvent, (loanEvent) => loanEvent.item, { cascade: true })
  events: Promise<LoanEvent[]>;

  @Column()
  type: string;

  @OneToMany(() => Comment, (comment) => comment.item, { cascade: true })
  comments: Promise<Comment[]>;
}
