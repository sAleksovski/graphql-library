import { IResolvers } from 'apollo-server';
import { CreateBookByIsbnInput, CreateBookInput, CreateBooksByIsbnsInput, IdInput } from './book.inputs';
import { bookService } from './book.service';
import { Book } from './database/book.entity';

export const resolvers: IResolvers = {
  Query: {
    books: (): Promise<Book[]> => bookService.getBooks(),
    book: (_, idInput: IdInput): Promise<Book> => bookService.getBookById(idInput),
  },
  Mutation: {
    createBook: (_, createBookInput: CreateBookInput): Promise<Book> => bookService.createBook(createBookInput),
    createBookByIsbn: (_, createBookByIsbnInput: CreateBookByIsbnInput): Promise<Book> =>
      bookService.createBookByIsbn(createBookByIsbnInput),
    createBooksByIsbns: (_, createBooksByIsbnsInput: CreateBooksByIsbnsInput): Promise<Book[]> =>
      bookService.createBooksByIsbns(createBooksByIsbnsInput),
  },
};
