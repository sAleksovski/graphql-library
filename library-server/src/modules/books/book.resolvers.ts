import { IResolvers } from 'apollo-server';
import { Comment } from '../common';
import { CreateBookByIsbnInput, CreateBookInput, CreateBooksByIsbnsInput, IdInput } from './book.inputs';
import { bookService } from './book.service';
import { BookCategory } from './database/book-category.entity';
import { Book } from './database/book.entity';

export const resolvers: IResolvers = {
  Query: {
    books: (): Promise<Book[]> => bookService.getBooks(),
    book: (_: any, idInput: IdInput): Promise<Book> => bookService.getBookById(idInput),
  },
  Mutation: {
    createBook: (_: any, createBookInput: CreateBookInput): Promise<Book> => bookService.createBook(createBookInput),
    createBookByIsbn: (_: any, createBookByIsbnInput: CreateBookByIsbnInput): Promise<Book> =>
      bookService.createBookByIsbn(createBookByIsbnInput),
    createBooksByIsbns: (_: any, createBooksByIsbnsInput: CreateBooksByIsbnsInput): Promise<Book[]> =>
      bookService.createBooksByIsbns(createBooksByIsbnsInput),
  },
  Book: {
    categories: (book: Book): Promise<BookCategory[]> => book.categories,
    comments: (book: Book): Promise<Comment[]> => book.comments,
  },
};
