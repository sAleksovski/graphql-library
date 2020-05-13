import { ApolloError } from 'apollo-server';
import nodeIsbn from 'node-isbn';
import { ResolvedBookData } from './google-books.types';

export const resolveBookDetails = async (isbn: string): Promise<ResolvedBookData> => {
  try {
    const bookInfo: GoogleBookInfo = await nodeIsbn.provider([nodeIsbn.PROVIDER_NAMES.GOOGLE]).resolve(isbn);
    return {
      title: bookInfo.title,
      author: bookInfo.authors.join(', '),
    };
  } catch {
    throw new ApolloError(`Book with isbn "${isbn}" does not exist`, 'NOT_FOUND');
  }
};
