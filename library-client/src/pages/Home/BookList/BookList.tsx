import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { EmptyState } from 'shared/components/EmptyState';
import {
  LibraryList,
  LibraryListItem,
  LibraryListItemContent,
  LibraryListItemExternalInfoLink,
  LibraryListItemImage,
  LibraryListItemLeft,
  LibraryListItemSubtitle,
  LibraryListItemTitle,
} from 'shared/components/Library';
import { Loading } from 'shared/components/Loading';
import { Rating } from 'shared/components/Rating';
import { dateFormatter } from 'shared/helpers';
import { Book, BookCategory } from './book.type';
import { Category, CategoryList } from './styled';

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
    <LibraryList>
      {data.books.map(
        (
          { id, title, author, averageRating, thumbnail, publisher, publishedDate, categories, isbn10, infoLink }: Book,
          index: number,
        ) => (
          <LibraryListItem
            first={index === 0}
            last={index === data.books.length - 1}
            key={id}
            onClick={() => onSelectBook(id)}
          >
            <LibraryListItemLeft>
              <LibraryListItemImage src={thumbnail} />
            </LibraryListItemLeft>
            <LibraryListItemContent>
              <LibraryListItemTitle>{title}</LibraryListItemTitle>
              <LibraryListItemSubtitle>{author}</LibraryListItemSubtitle>
              <LibraryListItemSubtitle>
                {publisher} • {dateFormatter.format(new Date(publishedDate))}
              </LibraryListItemSubtitle>
              <CategoryList>
                {categories.map((c: BookCategory) => (
                  <Category key={c.name}>{c.name}</Category>
                ))}
              </CategoryList>
              <LibraryListItemExternalInfoLink
                onClick={(event) => event.stopPropagation()}
                href={`https://www.goodreads.com/search?q=${isbn10}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Goodreads
              </LibraryListItemExternalInfoLink>
              <LibraryListItemExternalInfoLink
                onClick={(event) => event.stopPropagation()}
                href={infoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Books
              </LibraryListItemExternalInfoLink>
            </LibraryListItemContent>
            <Rating rating={averageRating} />
          </LibraryListItem>
        ),
      )}
    </LibraryList>
  );
}
