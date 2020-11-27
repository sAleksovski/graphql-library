import { ApolloError } from 'apollo-server';
import { BOARD_GAME_ATLAS_CLIENT_ID } from 'config';
import fetch from 'node-fetch';
import { BoardGameAtlasData, BoardGameAtlasGame, ResolvedBoardGameData } from './board-game-atlas.types';

const NEW_LINE = `
`;

const formatDescription = (description: string): string =>
  description
    .replace(/&quot;/g, '"')
    .replace(/<br \/>/g, NEW_LINE)
    .replace(/\\r\\n/g, NEW_LINE);

const convertBoardGame = (boardGameAtlasGame: BoardGameAtlasGame): ResolvedBoardGameData => ({
  id: boardGameAtlasGame.id,
  title: boardGameAtlasGame.name,
  description: formatDescription(boardGameAtlasGame.description),
  smallThumbnail: boardGameAtlasGame.thumb_url,
  thumbnail: boardGameAtlasGame.image_url,
  publisher: boardGameAtlasGame.primary_publisher?.name ?? '',
  publishedDate: `${boardGameAtlasGame.year_published}`,
  averageRating: parseFloat(boardGameAtlasGame.average_user_rating.toFixed(2)),
  ratingsCount: boardGameAtlasGame.num_user_ratings,
  minPlayers: boardGameAtlasGame.min_players,
  maxPlayers: boardGameAtlasGame.max_players,
  minPlayTime: boardGameAtlasGame.min_playtime,
  maxPlayTime: boardGameAtlasGame.max_playtime,
  boardGameAtlasUrl: boardGameAtlasGame.url,
  officialUrl: boardGameAtlasGame.official_url,
  rulesUrl: boardGameAtlasGame.rules_url,
});

export const resolveBoardGameDetails = async (id: string): Promise<ResolvedBoardGameData> => {
  try {
    const {
      games: [game],
    }: BoardGameAtlasData = await fetch(
      `https://api.boardgameatlas.com/api/search?client_id=${BOARD_GAME_ATLAS_CLIENT_ID}&ids=${id}`,
    ).then((result) => result.json());

    return convertBoardGame(game);
  } catch {
    throw new ApolloError(`Board game with "${id}" does not exist`, 'NOT_FOUND');
  }
};

export const findBoardGamesByTitle = async (title: string): Promise<ResolvedBoardGameData[]> => {
  try {
    const { games }: BoardGameAtlasData = await fetch(
      `https://api.boardgameatlas.com/api/search?client_id=${BOARD_GAME_ATLAS_CLIENT_ID}&name=${title}`,
    ).then((result) => result.json());

    return games.map(convertBoardGame);
  } catch {
    throw new ApolloError(`Board game with title "${title}" does not exist`, 'NOT_FOUND');
  }
};
