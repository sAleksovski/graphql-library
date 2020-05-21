import { getCustomRepository } from 'typeorm';
import { CreateBookByIsbnInput, CreateBookInput, CreateBooksByIsbnsInput, IdInput } from './book.inputs';
import { resolveBookDetails, ResolvedBookData } from './books-data-resolver';
import { BookCategory } from './database/book-category.entity';
import { CategoryRepository } from './database/book-category.repository';
import { Book } from './database/book.entity';
import { BookRepository } from './database/book.repository';

class BookService {
  private get bookRepository(): BookRepository {
    return getCustomRepository(BookRepository);
  }

  private get categoryRepository(): CategoryRepository {
    return getCustomRepository(CategoryRepository);
  }

  async getBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async getBookById({ id }: IdInput): Promise<Book> {
    return this.bookRepository.findById(id);
  }

  async createBook({ book }: CreateBookInput): Promise<Book> {
    return this.saveBook(book);
  }

  async createBookByIsbn({ isbn }: CreateBookByIsbnInput): Promise<Book> {
    const resolveBookData: ResolvedBookData = await resolveBookDetails(isbn);
    return this.saveBook(resolveBookData);
  }

  async createBooksByIsbns(createBooksByIsbnsInput: CreateBooksByIsbnsInput): Promise<Book[]> {
    const bookDetails = await Promise.all(
      createBooksByIsbnsInput.isbnList.map((isbn: string) => resolveBookDetails(isbn)),
    );
    let categoryNames = bookDetails.reduce(
      (memo: string[], book: ResolvedBookData) => [...memo, ...book.categories],
      [],
    );
    categoryNames = [...new Set(categoryNames)];
    const categories: BookCategory[] = await this.categoryRepository.findOrCreateByName(categoryNames);

    return Promise.all(
      bookDetails.map((book: ResolvedBookData) =>
        this.bookRepository.createBook(
          book,
          categories.filter((c: BookCategory) => book.categories.includes(c.name)),
        ),
      ),
    );
  }

  private async saveBook(bookData: ResolvedBookData): Promise<Book> {
    const categories = await this.categoryRepository.findOrCreateByName(bookData.categories);
    return this.bookRepository.createBook(bookData, categories);
  }
}

export const bookService = new BookService();
