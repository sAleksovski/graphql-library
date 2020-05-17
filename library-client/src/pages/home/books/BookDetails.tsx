import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';

const GET_BOOK_DETAILS = gql`
  query Book($bookId: Int!) {
    book(id: $bookId) {
      id
      author
      title
      thumbnail
    }
  }
`;

export function BookDetails({ bookId }: any) {
  const { loading, error, data } = useQuery(GET_BOOK_DETAILS, {
    variables: { bookId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <div>{`Error! ${error}`}</div>;

  return (
    <div>
      <div>Author: {data.book.author}</div>
      <img src={data.book.thumbnail} alt={`Cover for ${data.book.title}`} />
    </div>
  );
}
