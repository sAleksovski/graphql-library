import { IResolvers } from 'apollo-server';
import { AuthenticatedUserContext } from 'modules/common';
import { LoanInfo, loanService } from 'modules/loans';
import { ResolvedBoardGameData } from './board-game-data-resolver';
import { BoardGame } from './board-game.entity';
import {
  CreateBoardGameByBoardGameAtlasIdInput,
  FindBoardGameFromBoardGameAtlasInput,
  IdInput,
} from './board-game.inputs';
import { boardGameService } from './board-game.service';

export const resolvers: IResolvers = {
  Query: {
    boardGames: (): Promise<BoardGame[]> => boardGameService.getBoardGames(),
    boardGame: (_, idInput: IdInput): Promise<BoardGame> => boardGameService.getBoardGameById(idInput),
    findBoardGameFromBoardGameAtlas: (
      _,
      findBoardGameFromBoardGameAtlasInput: FindBoardGameFromBoardGameAtlasInput,
      ctx: AuthenticatedUserContext,
    ): Promise<ResolvedBoardGameData[]> =>
      boardGameService.findBoardGameFromBoardGameAtlas(ctx, findBoardGameFromBoardGameAtlasInput),
  },
  Mutation: {
    createBoardGameByBoardGameAtlasId: (
      _,
      createBoardGameByBoardGameAtlasIdInput: CreateBoardGameByBoardGameAtlasIdInput,
      ctx: AuthenticatedUserContext,
    ): Promise<BoardGame> =>
      boardGameService.createBoardGameByBoardGameAtlasId(ctx, createBoardGameByBoardGameAtlasIdInput),
  },
  BoardGame: {
    loanInfo: (boardGame: BoardGame, _, ctx: AuthenticatedUserContext): Promise<LoanInfo> =>
      loanService.getLoanInfo(boardGame.id, ctx.userId),
  },
};
