import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { Rating } from 'shared/components/Rating';
import { Author, BookDetailsWrapper, Description, Image, Left, LeftContent, Right, Title } from './styled';

const GET_BOOK_DETAILS = gql`
  query Book($bookId: Int!) {
    book(id: $bookId) {
      id
      author
      title
      thumbnail
      description
      averageRating
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
    <BookDetailsWrapper>
      <Left>
        <LeftContent>
          <Image src={data.book.thumbnail} alt={`Cover for ${data.book.title}`} />
          <Rating rating={data.book.averageRating} />
        </LeftContent>
      </Left>
      <Right>
        <Title>{data.book.title}</Title>
        <Author>{data.book.author}</Author>
        <Description>{data.book.description}</Description>
      </Right>
    </BookDetailsWrapper>
  );
}
