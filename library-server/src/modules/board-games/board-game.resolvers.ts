import { IResolvers } from 'apollo-server';
import { Comment } from '../common/database/comment.entity';
import { boardGames } from './board-game.data';
import { BoardGame } from './board-game.entity';
import { BoardGame as BoardGameType } from './board-game.types';

export const resolvers: IResolvers = {
  Query: {
    boardGames: (): BoardGameType[] => boardGames,
    boardGame: (_: any, { id }: { id: number }): BoardGameType | undefined => boardGames.find((b) => b.id === id),
  },
  Book: {
    comments: (boardGame: BoardGame): Promise<Comment[]> => boardGame.commentThread.comments,
  },
};
