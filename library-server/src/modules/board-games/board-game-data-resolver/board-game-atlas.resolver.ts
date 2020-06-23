import { ApolloError } from 'apollo-server';
import { BOARD_GAME_ATLAS_CLIENT_ID } from 'config';
import fetch from 'node-fetch';
import { BoardGameAtlasData, ResolvedBoardGameData } from './board-game-atlas.types';

const NEW_LINE = `
`;

const formatDescription = (description: string): string =>
  description
    .replace(/&quot;/g, '"')
    .replace(/<br \/>/g, NEW_LINE)
    .replace(/\\r\\n/g, NEW_LINE);

export const resolveBoardGameDetails = async (id: string): Promise<ResolvedBoardGameData> => {
  try {
    const {
      games: [game],
    }: BoardGameAtlasData = await fetch(
      `https://www.boardgameatlas.com/api/search?client_id=${BOARD_GAME_ATLAS_CLIENT_ID}&ids=${id}`,
    ).then((result) => result.json());

    return {
      title: game.name,
      description: formatDescription(game.description),
      smallThumbnail: game.thumb_url,
      thumbnail: game.image_url,
      publisher: game.primary_publisher,
      publishedDate: `${game.year_published}`,
      averageRating: parseFloat(game.average_user_rating.toFixed(2)),
      ratingsCount: game.num_user_ratings,
      minPlayers: game.min_players,
      maxPlayers: game.max_players,
      minPlayTime: game.min_playtime,
      maxPlayTime: game.max_playtime,
      boardGameAtlasUrl: game.url,
      officialUrl: game.official_url,
      rulesUrl: game.rules_url,
    };
  } catch {
    throw new ApolloError(`Board game with isbn "${id}" does not exist`, 'NOT_FOUND');
  }
};
