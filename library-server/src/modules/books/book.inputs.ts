export interface IdInput {
  id: number;
}

export interface CreateBookInput {
  book: {
    title: string;
    author: string;
  };
}

export interface CreateBookByIsbnInput {
  isbn: string;
}
