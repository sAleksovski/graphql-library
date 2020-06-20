import { LoanEvent } from 'modules/loans/loan-event.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
@TableInheritance({
  column: {
    type: 'string',
    name: 'type',
  },
})
export class LibraryItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => LoanEvent, (loanEvent) => loanEvent.item, { cascade: true })
  events: Promise<LoanEvent[]>;

  @Column()
  type: string;

  @OneToMany(() => Comment, (comment) => comment.item, { cascade: true })
  comments: Promise<Comment[]>;
}
