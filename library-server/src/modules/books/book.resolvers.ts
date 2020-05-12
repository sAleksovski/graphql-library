import { IResolvers } from 'apollo-server';
import { books } from './book.data';
import { Book } from './book.types';

export const resolvers: IResolvers = {
  Query: {
    books: (): Book[] => books,
    book: (_: any, { id }: { id: number }): Book | undefined => {
      console.log(typeof id);
      return books.find((b) => b.id === id);
    },
  },
};
