import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { EmptyState } from 'shared/components/EmptyState';
import { PlayersIcon, PlayingTimeIcon } from 'shared/components/Icon';
import {
  LibraryList,
  LibraryListItem,
  LibraryListItemContent,
  LibraryListItemExternalInfoLink,
  LibraryListItemIconSubtitle,
  LibraryListItemIconWrapper,
  LibraryListItemImage,
  LibraryListItemLeft,
  LibraryListItemSubtitle,
  LibraryListItemTitle,
} from 'shared/components/Library';
import { Loading } from 'shared/components/Loading';
import { Rating } from 'shared/components/Rating';
import { dateFormatter } from 'shared/utils';
import { BoardGame } from './board-game.type';

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
        title="Failed to load board games"
        message="Some error occured while loading the board games. Please try again."
        icon="board-game"
      />
    );
  }

  if (data.boardGames.length === 0) {
    return <EmptyState title="No board games" message="No board games found in the library" icon="board-game" />;
  }

  return (
    <LibraryList>
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
          <LibraryListItem
            first={index === 0}
            last={index === data.boardGames.length - 1}
            key={id}
            onClick={() => onSelectBoardGame(id)}
          >
            <LibraryListItemLeft>
              <LibraryListItemImage src={thumbnail} />
            </LibraryListItemLeft>
            <LibraryListItemContent>
              <LibraryListItemTitle>{title}</LibraryListItemTitle>
              <LibraryListItemSubtitle>
                {publisher} • {dateFormatter.format(new Date(publishedDate))}
              </LibraryListItemSubtitle>
              <LibraryListItemIconSubtitle>
                <LibraryListItemIconWrapper>
                  <PlayingTimeIcon size={20} />
                </LibraryListItemIconWrapper>
                {minPlayTime}min → {maxPlayTime}min
              </LibraryListItemIconSubtitle>
              <LibraryListItemIconSubtitle>
                <LibraryListItemIconWrapper>
                  <PlayersIcon size={20} />
                </LibraryListItemIconWrapper>
                {minPlayers} → {maxPlayers} players
              </LibraryListItemIconSubtitle>
              <LibraryListItemExternalInfoLink
                onClick={(event) => event.stopPropagation()}
                href={boardGameAtlasUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Board Game Atlas
              </LibraryListItemExternalInfoLink>
              <LibraryListItemExternalInfoLink
                onClick={(event) => event.stopPropagation()}
                href={officialUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Official page
              </LibraryListItemExternalInfoLink>
              <LibraryListItemExternalInfoLink
                onClick={(event) => event.stopPropagation()}
                href={rulesUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Rules
              </LibraryListItemExternalInfoLink>
            </LibraryListItemContent>
            <Rating rating={averageRating} />
          </LibraryListItem>
        ),
      )}
    </LibraryList>
  );
}
