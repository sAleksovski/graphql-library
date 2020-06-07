import { IResolvers } from 'apollo-server';
import { AuthenticatedUserContext } from 'modules/common';
import { LoanInfo, loanService } from 'modules/loans';
import { boardGames } from './board-game.data';
import { BoardGame } from './board-game.entity';
import { BoardGame as BoardGameType } from './board-game.types';

export const resolvers: IResolvers = {
  Query: {
    boardGames: (): BoardGameType[] => boardGames,
    boardGame: (_, { id }: { id: number }): BoardGameType | undefined => boardGames.find((b) => b.id === id),
  },
  BoardGame: {
    loanInfo: (boardGame: BoardGame, _, ctx: AuthenticatedUserContext): Promise<LoanInfo> =>
      loanService.getLoanInfo(boardGame.id, ctx.userId),
  },
};
