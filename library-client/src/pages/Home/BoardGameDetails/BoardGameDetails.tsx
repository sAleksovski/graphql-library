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
  BoardGameIconInfo,
  StyledPlayingTimeIcon,
  StyledPlayersIcon,
} from '../common/styled';
import { BookDetailsWrapper, Description, Image, Left, LeftContent, Right, StyledRating, Title } from './styled';

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
    <BookDetailsWrapper>
      <Left>
        <LeftContent>
          <Image src={data.boardGame.thumbnail} alt={`Cover for ${data.boardGame.title}`} />
          <StyledRating rating={data.boardGame.averageRating} />
          <LoanButton
            itemId={boardGameId}
            propertyKey="boardGame"
            queryWithVariables={{
              query: GET_BOARD_GAME_DETAILS,
              variables: { boardGameId },
            }}
            loanInfo={data.boardGame.loanInfo}
          />
        </LeftContent>
      </Left>
      <Right>
        <Title>{data.boardGame.title}</Title>
        <BoardGameIconInfo>
          <StyledPlayingTimeIcon size={20} /> {data.boardGame.minPlayTime}min → {data.boardGame.maxPlayTime}min
        </BoardGameIconInfo>
        <BoardGameIconInfo>
          <StyledPlayersIcon size={20} /> {data.boardGame.minPlayers} → {data.boardGame.maxPlayers} players
        </BoardGameIconInfo>
        <Description dangerouslySetInnerHTML={{ __html: data.boardGame.description }}></Description>

        <CommentSection>
          {data.boardGame.comments.map((comment: any) => (
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
            itemId={boardGameId}
            propertyKey="boardGame"
            queryWithVariables={{
              query: GET_BOARD_GAME_DETAILS,
              variables: { boardGameId },
            }}
          />
        </CommentSection>
      </Right>
    </BookDetailsWrapper>
  );
}
