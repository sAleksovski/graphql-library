import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { EmptyState } from 'shared/components/EmptyState';
import { Loading } from 'shared/components/Loading';
import { Rating } from 'shared/components/Rating';
import { dateFormatter } from 'shared/helpers';
import { Book, BookCategory } from './book.type';
import {
  Author,
  BookListInfo,
  BookListItem,
  BookListWrapper,
  Category,
  CategoryList,
  ExternalInfoLink,
  Image,
  PublisherInfo,
  Title,
} from './styled';

const GET_BOOKS = gql`
  query Books {
    books {
      id
      title
      author
      averageRating
      thumbnail
      publisher
      publishedDate
      categories {
        name
      }
      infoLink
      isbn10
    }
  }
`;

interface BookListProps {
  onSelectBook: (bookId: number) => void;
}

export function BookList({ onSelectBook = () => {} }: BookListProps) {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <Loading />;
  if (error) {
    return (
      <EmptyState
        title="Failed to load books"
        message="Some error occured while loading the books. Please try again."
        icon="book"
      />
    );
  }

  if (data.books.length === 0) {
    return <EmptyState title="No books" message="No books found in the library" icon="book" />;
  }

  return (
    <BookListWrapper>
      {data.books.map(
        (
          { id, title, author, averageRating, thumbnail, publisher, publishedDate, categories, isbn10, infoLink }: Book,
          index: number,
        ) => (
          <BookListItem
            first={index === 0}
            last={index === data.books.length - 1}
            key={id}
            onClick={() => onSelectBook(id)}
          >
            <Image src={thumbnail} />
            <BookListInfo>
              <Title>{title}</Title>
              <Author>{author}</Author>
              <PublisherInfo>
                {publisher} • {dateFormatter.format(new Date(publishedDate))}
              </PublisherInfo>
              <CategoryList>
                {categories.map((c: BookCategory) => (
                  <Category key={c.name}>{c.name}</Category>
                ))}
              </CategoryList>
              <ExternalInfoLink
                onClick={(event) => event.stopPropagation()}
                href={`https://www.goodreads.com/search?q=${isbn10}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Goodreads
              </ExternalInfoLink>
              <ExternalInfoLink
                onClick={(event) => event.stopPropagation()}
                href={infoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Books
              </ExternalInfoLink>
            </BookListInfo>
            <Rating rating={averageRating} />
          </BookListItem>
        ),
      )}
    </BookListWrapper>
  );
}
