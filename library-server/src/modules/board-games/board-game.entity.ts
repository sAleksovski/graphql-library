import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommentThread } from '../common/database/comment-thread.entity';

@Entity()
export class BoardGame extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  boardGameGeekUrl: string;

  @OneToOne(() => CommentThread, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  commentThread: CommentThread = new CommentThread();
}
