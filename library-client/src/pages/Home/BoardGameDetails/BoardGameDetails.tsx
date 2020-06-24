import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { Avatar } from 'shared/components/Avatar';
import { EmptyState } from 'shared/components/EmptyState';
import { PlayersIcon, PlayingTimeIcon } from 'shared/components/Icon';
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
  LibraryItemDetailsIconSubtitle,
  LibraryItemDetailsIconWrapper,
  LibraryItemDetailsImage,
  LibraryItemDetailsLeft,
  LibraryItemDetailsLeftContent,
  LibraryItemDetailsRight,
  LibraryItemDetailsStyledRating,
  LibraryItemDetailsTitle,
} from 'shared/components/Library';
import { Loading } from 'shared/components/Loading';
import { dateTimeFormatter } from 'shared/utils/date-time.formatter';
import { AddComment } from '../common/AddComment';
import { LoanButton } from '../common/LoanButton';

const GET_BOARD_GAME_DETAILS = gql`
  query BoardGame($boardGameId: Int!) {
    boardGame(id: $boardGameId) {
      id
      title
      thumbnail
      description
      averageRating
      boardGameAtlasUrl
      officialUrl
      rulesUrl
      minPlayTime
      maxPlayTime
      minPlayers
      maxPlayers
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

interface BoardGameDetailsProps {
  boardGameId: number;
}

export function BoardGameDetails({ boardGameId }: BoardGameDetailsProps) {
  const { loading, error, data } = useQuery(GET_BOARD_GAME_DETAILS, {
    variables: { boardGameId },
  });

  if (loading) return <Loading />;
  if (error) {
    return (
      <EmptyState
        title="Failed to load board game details"
        message="Some error occured while loading the details. Please try again."
        icon="board-game"
      />
    );
  }

  return (
    <LibraryItemDetails>
      <LibraryItemDetailsLeft>
        <LibraryItemDetailsLeftContent>
          <LibraryItemDetailsImage src={data.boardGame.thumbnail} alt={`Cover for ${data.boardGame.title}`} />
          <LibraryItemDetailsStyledRating rating={data.boardGame.averageRating} />
          <LoanButton
            itemId={boardGameId}
            propertyKey="boardGame"
            queryWithVariables={{
              query: GET_BOARD_GAME_DETAILS,
              variables: { boardGameId },
            }}
            loanInfo={data.boardGame.loanInfo}
          />
        </LibraryItemDetailsLeftContent>
      </LibraryItemDetailsLeft>

      <LibraryItemDetailsRight>
        <LibraryItemDetailsTitle>{data.boardGame.title}</LibraryItemDetailsTitle>
        <LibraryItemDetailsIconSubtitle>
          <LibraryItemDetailsIconWrapper>
            <PlayingTimeIcon size={20} />
          </LibraryItemDetailsIconWrapper>
          {data.boardGame.minPlayTime}min → {data.boardGame.maxPlayTime}min
        </LibraryItemDetailsIconSubtitle>
        <LibraryItemDetailsIconSubtitle>
          <LibraryItemDetailsIconWrapper>
            <PlayersIcon size={20} />
          </LibraryItemDetailsIconWrapper>
          {data.boardGame.minPlayers} → {data.boardGame.maxPlayers} players
        </LibraryItemDetailsIconSubtitle>
        <LibraryItemDetailsDescription dangerouslySetInnerHTML={{ __html: data.boardGame.description }} />

        <LibraryItemDetailsCommentSection>
          {data.boardGame.comments.map((comment: any) => (
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
            itemId={boardGameId}
            propertyKey="boardGame"
            queryWithVariables={{
              query: GET_BOARD_GAME_DETAILS,
              variables: { boardGameId },
            }}
          />
        </LibraryItemDetailsCommentSection>
      </LibraryItemDetailsRight>
    </LibraryItemDetails>
  );
}
