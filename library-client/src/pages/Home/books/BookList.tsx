import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useState } from 'react';
import { BookDetails } from './BookDetails';

const GET_BOOKS = gql`
  query Books {
    books {
      id
      title
      author
      averageRating
      thumbnail
    }
  }
`;

export function BookList() {
  const [selectedBook, setSelectedBook] = useState(null);
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div style={{ display: 'flex' }}>
      <ul>
        {data.books.map(({ id, title, author, averageRating }: any) => (
          <li key={id} onClick={() => setSelectedBook(id)}>
            <div>{title}</div>
            <small>{author}</small>
            <small>{averageRating}</small>
          </li>
        ))}
      </ul>
      {selectedBook && <BookDetails bookId={selectedBook} />}
    </div>
  );
}