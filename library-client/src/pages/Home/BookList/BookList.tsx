import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useState } from 'react';
import { Rating } from 'shared/components/Rating';
import { dateFormatter } from 'shared/helpers';
import { BookDetails } from '../BookDetails';
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

export function BookList() {
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <BookListWrapper>
        {data.books.map(
          (
            {
              id,
              title,
              author,
              averageRating,
              thumbnail,
              publisher,
              publishedDate,
              categories,
              isbn10,
              infoLink,
            }: Book,
            index: number,
          ) => (
            <BookListItem
              first={index === 0}
              last={index === data.books.length - 1}
              key={id}
              onClick={() => setSelectedBook(id)}
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
      {selectedBook && <BookDetails bookId={selectedBook} />}
    </>
  );
}
