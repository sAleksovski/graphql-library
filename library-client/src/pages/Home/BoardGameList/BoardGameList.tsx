import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { EmptyState } from 'shared/components/EmptyState';
import { Loading } from 'shared/components/Loading';
import { Rating } from 'shared/components/Rating';
import { dateFormatter } from 'shared/helpers';
import { BoardGame } from './board-game.type';
import {
  BoardGameIconInfo,
  BoardGameListInfo,
  BoardGameListItem,
  BoardGameListWrapper,
  ExternalInfoLink,
  Image,
  PublisherInfo,
  StyledPlayersIcon,
  StyledPlayingTimeIcon,
  Title,
} from './styled';

const GET_BOARD_GAMES = gql`
  query BoardGames {
    boardGames {
      id
      title
      averageRating
      thumbnail
      publisher
      publishedDate
      boardGameAtlasUrl
      officialUrl
      rulesUrl
      minPlayTime
      maxPlayTime
      minPlayers
      maxPlayers
    }
  }
`;

interface BoardGameListProps {
  onSelectBoardGame: (boardGameId: number) => void;
}

export function BoardGameList({ onSelectBoardGame }: BoardGameListProps) {
  const { loading, error, data } = useQuery(GET_BOARD_GAMES);

  if (loading) return <Loading />;
  if (error) {
    return (
      <EmptyState
        title="Failed to load board gfames"
        message="Some error occured while loading the board games. Please try again."
        icon="board-game"
      />
    );
  }

  if (data.boardGames.length === 0) {
    return <EmptyState title="No board games" message="No board games found in the library" icon="board-game" />;
  }

  return (
    <BoardGameListWrapper>
      {data.boardGames.map(
        (
          {
            id,
            title,
            averageRating,
            thumbnail,
            publisher,
            publishedDate,
            boardGameAtlasUrl,
            officialUrl,
            rulesUrl,
            minPlayTime,
            maxPlayTime,
            minPlayers,
            maxPlayers,
          }: BoardGame,
          index: number,
        ) => (
          <BoardGameListItem
            first={index === 0}
            last={index === data.boardGames.length - 1}
            key={id}
            onClick={() => onSelectBoardGame(id)}
          >
            <Image src={thumbnail} />
            <BoardGameListInfo>
              <Title>{title}</Title>
              <PublisherInfo>
                {publisher} • {dateFormatter.format(new Date(publishedDate))}
              </PublisherInfo>
              <BoardGameIconInfo>
                <StyledPlayingTimeIcon size={20} /> {minPlayTime}min → {maxPlayTime}min
              </BoardGameIconInfo>
              <BoardGameIconInfo>
                <StyledPlayersIcon size={20} /> {minPlayers} → {maxPlayers}
              </BoardGameIconInfo>
              <ExternalInfoLink
                onClick={(event) => event.stopPropagation()}
                href={boardGameAtlasUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Board Game Atlas
              </ExternalInfoLink>
              <ExternalInfoLink
                onClick={(event) => event.stopPropagation()}
                href={officialUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Official page
              </ExternalInfoLink>
              <ExternalInfoLink
                onClick={(event) => event.stopPropagation()}
                href={rulesUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Rules
              </ExternalInfoLink>
            </BoardGameListInfo>
            <Rating rating={averageRating} />
          </BoardGameListItem>
        ),
      )}
    </BoardGameListWrapper>
  );
}
