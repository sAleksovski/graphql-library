import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useState } from 'react';

const GET_BOOKS = gql`
  query Books {
    books {
      id
      title
    }
  }
`;

const GET_BOOK_DETAILS = gql`
  query Book($bookId: Int!) {
    book(id: $bookId) {
      id
      author
    }
  }
`;

function BookDetails({ bookId }: any) {
  const { loading, error, data } = useQuery(GET_BOOK_DETAILS, {
    variables: { bookId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <div>{`Error! ${error}`}</div>;

  return <div>{data.book.author}</div>;
}

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div style={{ display: 'flex' }}>
      <ul>
        {data.books.map(({ id, title }: any) => (
          <li key={id} onClick={() => setSelectedBook(id)}>
            {title}
          </li>
        ))}
      </ul>
      {selectedBook && <BookDetails bookId={selectedBook} />}
    </div>
  );
}

export default App;
