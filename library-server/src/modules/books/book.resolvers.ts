import { IResolvers } from 'apollo-server';
import { Book } from './book.entity';
import { CreateBookByIsbnInput, CreateBookInput, IdInput } from './book.inputs';
import * as bookService from './book.service';

export const resolvers: IResolvers = {
  Query: {
    books: (): Promise<Book[]> => bookService.getBooks(),
    book: (_: any, idInput: IdInput): Promise<Book> => bookService.getBookById(idInput),
  },
  Mutation: {
    createBook: (_: any, createBookInput: CreateBookInput): Promise<Book> => bookService.createBook(createBookInput),
    createBookByIsbn: (_: any, createBookByIsbnInput: CreateBookByIsbnInput): Promise<Book> =>
      bookService.createBookByIsbn(createBookByIsbnInput),
  },
};
