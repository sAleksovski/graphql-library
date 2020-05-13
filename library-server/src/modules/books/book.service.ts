import { getCustomRepository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookByIsbnInput, CreateBookInput, IdInput } from './book.inputs';
import { BookRepository } from './book.repository';
import { resolveBookDetails, ResolvedBookData } from './books-data-resolver';

class BookService {
  private get bookRepository() {
    return getCustomRepository(BookRepository);
  }

  async getBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async getBookById({ id }: IdInput): Promise<Book> {
    return this.bookRepository.findById(id);
  }

  async createBook({ book: { title, author } }: CreateBookInput): Promise<Book> {
    return this.bookRepository.createBook(title, author);
  }
  async createBookByIsbn({ isbn }: CreateBookByIsbnInput): Promise<Book> {
    const { title, author }: ResolvedBookData = await resolveBookDetails(isbn);
    return this.bookRepository.createBook(title, author);
  }
}

export const bookService = new BookService();
