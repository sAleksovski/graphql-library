import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

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
    type: 'float',
    default: 0,
  })
  pageCount: number;

  @Column({
    nullable: true,
  })
  printType: string;

  @ManyToMany(() => Category, (category) => category.books)
  @JoinTable()
  categories: Promise<Category[]>;

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
