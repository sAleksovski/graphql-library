import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { Button } from 'shared/components/Button';
import { EmptyState } from 'shared/components/EmptyState';
import { PlayersIcon, PlayingTimeIcon } from 'shared/components/Icon';
import {
  LibraryList,
  LibraryListItem,
  LibraryListItemActions,
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

const SEARCH_BOARD_GAMES = gql`
  query BoardGamesFromBordGameAtlas($title: String!) {
    findBoardGameFromBoardGameAtlas(title: $title) {
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
      alreadyAdded
    }
  }
`;

const ADD_BOARD_GAME_TO_LIBRARY = gql`
  mutation createBoardGameByBoardGameAtlasId($id: String!) {
    createBoardGameByBoardGameAtlasId(boardGameAtlasId: $id) {
      id
      title
    }
  }
`;

interface BoardGameResultsProps {
  search: string;
  onSelectBoardGame: (boardGameId: string) => void;
}

export function BoardGameResults({ search, onSelectBoardGame }: BoardGameResultsProps) {
  const { loading, error, data, refetch } = useQuery(SEARCH_BOARD_GAMES, {
    variables: {
      title: search,
    },
  });

  const [addBoardGame] = useMutation(ADD_BOARD_GAME_TO_LIBRARY, {
    onCompleted: () => refetch(),
  });

  function addBoardGameClicked(id: string) {
    addBoardGame({
      variables: {
        id,
      },
    });
  }

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

  if (data.findBoardGameFromBoardGameAtlas.length === 0) {
    return <EmptyState title="No board games" message="No board games found in the library" icon="board-game" />;
  }

  return (
    <LibraryList>
      {data.findBoardGameFromBoardGameAtlas.map(
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
            alreadyAdded,
          }: any,
          index: number,
        ) => (
          <LibraryListItem
            first={index === 0}
            last={index === data.findBoardGameFromBoardGameAtlas.length - 1}
            key={id}
            onClick={() => onSelectBoardGame(id)}
          >
            <LibraryListItemLeft>
              <LibraryListItemImage src={thumbnail} />
            </LibraryListItemLeft>
            <LibraryListItemContent>
              <LibraryListItemTitle>{title}</LibraryListItemTitle>
              <LibraryListItemSubtitle>
                {publisher} {publisher && publishedDate !== 'null' && '•'} {publishedDate !== 'null' && publishedDate}
              </LibraryListItemSubtitle>
              {minPlayTime && maxPlayTime && (
                <LibraryListItemIconSubtitle>
                  <LibraryListItemIconWrapper>
                    <PlayingTimeIcon size={20} />
                  </LibraryListItemIconWrapper>
                  {minPlayTime}min → {maxPlayTime}min
                </LibraryListItemIconSubtitle>
              )}
              {minPlayers && maxPlayers && (
                <LibraryListItemIconSubtitle>
                  <LibraryListItemIconWrapper>
                    <PlayersIcon size={20} />
                  </LibraryListItemIconWrapper>
                  {minPlayers} → {maxPlayers} players
                </LibraryListItemIconSubtitle>
              )}
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
            <LibraryListItemActions>
              <Rating rating={averageRating} />
              <Button disabled={alreadyAdded} onClick={() => addBoardGameClicked(id)}>
                {alreadyAdded ? 'Already added' : 'Add to library'}
              </Button>
            </LibraryListItemActions>
          </LibraryListItem>
        ),
      )}
    </LibraryList>
  );
}
