import { IResolvers } from 'apollo-server';
import { AuthenticatedUserContext } from 'modules/common';
import { LoanInfo, loanService } from 'modules/loans';
import { CreateBookByIsbnInput, CreateBookInput, CreateBooksByIsbnsInput, IdInput } from './book.inputs';
import { bookService } from './book.service';
import { Book } from './database/book.entity';

export const resolvers: IResolvers = {
  Query: {
    books: (): Promise<Book[]> => bookService.getBooks(),
    book: (_, idInput: IdInput): Promise<Book> => bookService.getBookById(idInput),
  },
  Mutation: {
    createBook: (_, createBookInput: CreateBookInput, ctx: AuthenticatedUserContext): Promise<Book> =>
      bookService.createBook(ctx, createBookInput),
    createBookByIsbn: (_, createBookByIsbnInput: CreateBookByIsbnInput, ctx: AuthenticatedUserContext): Promise<Book> =>
      bookService.createBookByIsbn(ctx, createBookByIsbnInput),
    createBooksByIsbns: (
      _,
      createBooksByIsbnsInput: CreateBooksByIsbnsInput,
      ctx: AuthenticatedUserContext,
    ): Promise<Book[]> => bookService.createBooksByIsbns(ctx, createBooksByIsbnsInput),
  },
  Book: {
    loanInfo: (book: Book, _, ctx: AuthenticatedUserContext): Promise<LoanInfo> =>
      loanService.getLoanInfo(book.id, ctx.userId),
  },
};
