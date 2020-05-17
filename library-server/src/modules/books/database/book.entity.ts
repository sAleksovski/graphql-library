import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentThread } from '../../common/database/comment-thread.entity';
import { BookCategory } from './book-category.entity';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column()
  publishedDate: string;

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  isbn13?: string;

  @Column({
    nullable: true,
  })
  isbn10?: string;

  @Column({
    type: 'int',
    default: 0,
  })
  pageCount: number;

  @Column({
    nullable: true,
  })
  printType: string;

  @ManyToMany(() => BookCategory, (category) => category.books)
  @JoinTable()
  categories: Promise<BookCategory[]>;

  @OneToOne(() => CommentThread, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  commentThread: CommentThread = new CommentThread();

  @Column({
    type: 'float',
    default: 0,
  })
  averageRating: number;

  @Column({
    type: 'float',
    default: 0,
  })
  ratingsCount: number;

  @Column()
  smallThumbnail: string;

  @Column()
  thumbnail: string;

  @Column()
  language: string;

  @Column()
  infoLink: string;
}
