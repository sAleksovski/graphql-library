import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { Avatar } from 'shared/components/Avatar';
import { EmptyState } from 'shared/components/EmptyState';
import {
  LibraryItemDetails,
  LibraryItemDetailsComment,
  LibraryItemDetailsCommentContent,
  LibraryItemDetailsCommentDate,
  LibraryItemDetailsCommentLeft,
  LibraryItemDetailsCommentMain,
  LibraryItemDetailsCommentSection,
  LibraryItemDetailsCommentUser,
  LibraryItemDetailsDescription,
  LibraryItemDetailsImage,
  LibraryItemDetailsLeft,
  LibraryItemDetailsLeftContent,
  LibraryItemDetailsRight,
  LibraryItemDetailsStyledRating,
  LibraryItemDetailsSubtitle,
  LibraryItemDetailsTitle,
} from 'shared/components/Library';
import { Loading } from 'shared/components/Loading';
import { dateTimeFormatter } from 'shared/utils';
import { AddComment } from '../common/AddComment';
import { LoanButton } from '../common/LoanButton';

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
    <LibraryItemDetails>
      <LibraryItemDetailsLeft>
        <LibraryItemDetailsLeftContent>
          <LibraryItemDetailsImage src={data.book.thumbnail} alt={`Cover for ${data.book.title}`} />
          <LibraryItemDetailsStyledRating rating={data.book.averageRating} />
          <LoanButton
            itemId={bookId}
            propertyKey="book"
            queryWithVariables={{
              query: GET_BOOK_DETAILS,
              variables: { bookId },
            }}
            loanInfo={data.book.loanInfo}
          />
        </LibraryItemDetailsLeftContent>
      </LibraryItemDetailsLeft>
      <LibraryItemDetailsRight>
        <LibraryItemDetailsTitle>{data.book.title}</LibraryItemDetailsTitle>
        <LibraryItemDetailsSubtitle>{data.book.author}</LibraryItemDetailsSubtitle>
        <LibraryItemDetailsDescription>{data.book.description}</LibraryItemDetailsDescription>

        <LibraryItemDetailsCommentSection>
          {data.book.comments.map((comment: any) => (
            <LibraryItemDetailsComment key={comment.id}>
              <LibraryItemDetailsCommentLeft>
                <Avatar avatarUrl={comment.user.avatarUrl} name={comment.user.name}></Avatar>
              </LibraryItemDetailsCommentLeft>
              <LibraryItemDetailsCommentMain>
                <LibraryItemDetailsCommentUser>{comment.user.name}</LibraryItemDetailsCommentUser>
                <LibraryItemDetailsCommentContent>{comment.content}</LibraryItemDetailsCommentContent>
                <LibraryItemDetailsCommentDate>
                  {dateTimeFormatter.format(new Date(comment.createdAt))}
                </LibraryItemDetailsCommentDate>
              </LibraryItemDetailsCommentMain>
            </LibraryItemDetailsComment>
          ))}

          <AddComment
            itemId={bookId}
            propertyKey="book"
            queryWithVariables={{
              query: GET_BOOK_DETAILS,
              variables: { bookId },
            }}
          />
        </LibraryItemDetailsCommentSection>
      </LibraryItemDetailsRight>
    </LibraryItemDetails>
  );
}
