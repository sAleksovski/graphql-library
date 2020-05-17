import { ApolloError } from 'apollo-server';
import nodeIsbn from 'node-isbn';
import { ResolvedBookData } from './google-books.types';

export const resolveBookDetails = async (isbn: string): Promise<ResolvedBookData> => {
  try {
    const bookInfo: GoogleBookInfo = await nodeIsbn.provider([nodeIsbn.PROVIDER_NAMES.GOOGLE]).resolve(isbn);
    return {
      title: bookInfo.title,
      author: bookInfo.authors.join(', '),
      publisher: bookInfo.publisher,
      publishedDate: bookInfo.publishedDate,
      description: bookInfo.description,
      isbn13: bookInfo.industryIdentifiers.find(({ type }) => type === 'ISBN_13')?.identifier,
      isbn10: bookInfo.industryIdentifiers.find(({ type }) => type === 'ISBN_10')?.identifier,
      pageCount: bookInfo.pageCount,
      printType: bookInfo.printType,
      categories: bookInfo.categories,
      averageRating: bookInfo.averageRating,
      ratingsCount: bookInfo.ratingsCount,
      smallThumbnail: bookInfo.imageLinks.smallThumbnail,
      thumbnail: bookInfo.imageLinks.thumbnail,
      language: bookInfo.language,
      infoLink: bookInfo.infoLink,
    };
  } catch {
    throw new ApolloError(`Book with isbn "${isbn}" does not exist`, 'NOT_FOUND');
  }
};
