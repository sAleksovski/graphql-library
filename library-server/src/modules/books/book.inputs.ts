import { ResolvedBookData } from './books-data-resolver';

export interface IdInput {
  id: number;
}

export interface CreateBookInput {
  book: ResolvedBookData;
}

export interface CreateBookByIsbnInput {
  isbn: string;
}

export interface CreateBooksByIsbnsInput {
  isbnList: string[];
}
