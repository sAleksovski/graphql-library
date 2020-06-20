import { User } from 'modules/user';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LibraryItem } from './library-item.entity';

@Entity({
  orderBy: {
    createdAt: 'ASC',
  },
})
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LibraryItem, (libraryItem) => libraryItem.comments)
  item: LibraryItem;

  @Column()
  content: string;

  @ManyToOne(() => User)
  user: Promise<User>;

  @CreateDateColumn()
  createdAt: Date;
}
