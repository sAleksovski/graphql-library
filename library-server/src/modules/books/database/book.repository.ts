import { ApolloError } from 'apollo-server';
import { EntityRepository, Repository } from 'typeorm';
import { Book } from './book.entity';
import { ResolvedBookData } from '../books-data-resolver';
import { Category } from './category.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async findById(id: number): Promise<Book> {
    const book = await this.findOne(id);
    if (!book) {
      throw new ApolloError(`Book with id "${id}" does not exist`, 'NOT_FOUND');
    }
    return book;
  }

  async createBook(resolvedBookData: ResolvedBookData, categories: Category[]): Promise<Book> {
    const book = new Book();

    book.title = resolvedBookData.title;
    book.author = resolvedBookData.author;
    book.publisher = resolvedBookData.publisher;
    book.publishedDate = resolvedBookData.publishedDate;
    book.description = resolvedBookData.description;
    book.isbn13 = resolvedBookData.isbn13;
    book.isbn10 = resolvedBookData.isbn10;
    book.pageCount = resolvedBookData.pageCount;
    book.printType = resolvedBookData.printType;
    book.categories = Promise.resolve(categories);
    book.averageRating = resolvedBookData.averageRating;
    book.ratingsCount = resolvedBookData.ratingsCount;
    book.smallThumbnail = resolvedBookData.smallThumbnail;
    book.thumbnail = resolvedBookData.thumbnail;
    book.language = resolvedBookData.language;
    book.infoLink = resolvedBookData.infoLink;

    return book.save();
  }
}
