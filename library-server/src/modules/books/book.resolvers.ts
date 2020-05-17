import { IResolvers } from 'apollo-server';
import { CreateBookByIsbnInput, CreateBookInput, IdInput } from './book.inputs';
import { bookService } from './book.service';
import { Book } from './database/book.entity';
import { Category } from './database/category.entity';

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
  Book: {
    categories: (book: Book): Promise<Category[]> => book.categories,
  },
};
