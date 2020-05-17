import { IResolvers } from 'apollo-server';
import { Comment } from '../common/database/comment.entity';
import { CreateBookByIsbnInput, CreateBookInput, IdInput } from './book.inputs';
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
  },
  Book: {
    categories: (book: Book): Promise<BookCategory[]> => book.categories,
    comments: (book: Book): Promise<Comment[]> => book.commentThread.comments,
  },
};
