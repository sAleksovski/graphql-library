import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { Avatar } from 'shared/components/Avatar';
import { EmptyState } from 'shared/components/EmptyState';
import { Loading } from 'shared/components/Loading';
import { dateTimeFormatter } from 'shared/utils/date-time.formatter';
import { AddComment } from '../common/AddComment';
import { LoanButton } from '../common/LoanButton';
import {
  Comment,
  CommentContent,
  CommentDate,
  CommentLeft,
  CommentMain,
  CommentSection,
  CommentUser,
} from '../common/styled';
import {
  Author,
  BookDetailsWrapper,
  Description,
  Image,
  Left,
  LeftContent,
  Right,
  StyledRating,
  Title,
} from './styled';

const GET_BOOK_DETAILS = gql`
  query Book($bookId: Int!) {
    book(id: $bookId) {
      id
      author
      title
      thumbnail
      description
      averageRating
      comments {
        id
        content
        createdAt
        user {
          name
          avatarUrl
        }
      }
      loanInfo {
        canLoan
        hasPendingLoan
        loanedToUser
        loanHistory {
          loanStart
          loanEnd
          user {
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

export function BookDetails({ bookId }: any) {
  const { loading, error, data } = useQuery(GET_BOOK_DETAILS, {
    variables: { bookId },
  });

  if (loading) return <Loading />;
  if (error) {
    return (
      <EmptyState
        title="Failed to load book details"
        message="Some error occured while loading the details. Please try again."
        icon="book"
      />
    );
  }

  return (
    <BookDetailsWrapper>
      <Left>
        <LeftContent>
          <Image src={data.book.thumbnail} alt={`Cover for ${data.book.title}`} />
          <StyledRating rating={data.book.averageRating} />
          <LoanButton
            itemId={bookId}
            propertyKey="book"
            queryWithVariables={{
              query: GET_BOOK_DETAILS,
              variables: { bookId },
            }}
            loanInfo={data.book.loanInfo}
          />
        </LeftContent>
      </Left>
      <Right>
        <Title>{data.book.title}</Title>
        <Author>{data.book.author}</Author>
        <Description>{data.book.description}</Description>

        <CommentSection>
          {data.book.comments.map((comment: any) => (
            <Comment key={comment.id}>
              <CommentLeft>
                <Avatar avatarUrl={comment.user.avatarUrl} name={comment.user.name}></Avatar>
              </CommentLeft>
              <CommentMain>
                <CommentUser>{comment.user.name}</CommentUser>
                <CommentContent>{comment.content}</CommentContent>
                <CommentDate>{dateTimeFormatter.format(new Date(comment.createdAt))}</CommentDate>
              </CommentMain>
            </Comment>
          ))}

          <AddComment
            itemId={bookId}
            propertyKey="book"
            queryWithVariables={{
              query: GET_BOOK_DETAILS,
              variables: { bookId },
            }}
          />
        </CommentSection>
      </Right>
    </BookDetailsWrapper>
  );
}
