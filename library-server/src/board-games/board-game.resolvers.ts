import { IResolvers } from 'apollo-server';
import { boardGames } from './board-game.data';
import { BoardGame } from './board-game.types';

export const resolvers: IResolvers = {
  Query: {
    boardGames: (): BoardGame[] => boardGames,
    boardGame: (_: any, { id }: { id: string }): BoardGame | undefined => boardGames.find((b) => b.id === id),
  },
};
