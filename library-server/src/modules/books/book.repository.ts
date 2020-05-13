import { ApolloError } from 'apollo-server';
import { EntityRepository, Repository } from 'typeorm';
import { Book } from './book.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async findById(id: number): Promise<Book> {
    const book = await this.findOne(id);
    if (!book) {
      throw new ApolloError(`Book with id "${id}" does not exist`, 'NOT_FOUND');
    }
    return book;
  }

  async createBook(title: string, author: string): Promise<Book> {
    const book = new Book();
    book.title = title;
    book.author = author;
    return book.save();
  }
}
