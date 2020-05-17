import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommentThread } from './comment-thread.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CommentThread, (commentThread) => commentThread.comments)
  thread: CommentThread;

  @Column()
  comment: string;
}
