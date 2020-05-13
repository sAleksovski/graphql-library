import { ApolloError } from 'apollo-server';
import { Book } from './book.entity';
import { CreateBookByIsbnInput, CreateBookInput, IdInput } from './book.inputs';
import { resolveBookDetails, ResolvedBookData } from './books-data-resolver';

export const getBooks = async (): Promise<Book[]> => {
  return Book.find();
};

export const getBookById = async ({ id }: IdInput): Promise<Book> => {
  const book = await Book.findOne(id);
  if (!book) {
    throw new ApolloError(`Book with id "${id}" does not exist`, 'NOT_FOUND');
  }
  return book;
};

export const createBook = async ({ book }: CreateBookInput): Promise<Book> => {
  const b = new Book();
  b.title = book.title;
  b.author = book.author;
  return b.save();
};

export const createBookByIsbn = async ({ isbn }: CreateBookByIsbnInput): Promise<Book> => {
  const bookData: ResolvedBookData = await resolveBookDetails(isbn);
  const b = new Book();
  b.title = bookData.title;
  b.author = bookData.author;
  return b.save();
};
