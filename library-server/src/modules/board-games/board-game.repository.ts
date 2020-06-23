import { ApolloError } from 'apollo-server';
import { EntityRepository, Repository } from 'typeorm';
import { ResolvedBoardGameData } from './board-game-data-resolver/board-game-atlas.types';
import { BoardGame } from './board-game.entity';

@EntityRepository(BoardGame)
export class BoardGameRepository extends Repository<BoardGame> {
  async findById(id: number): Promise<BoardGame> {
    const boardGame = await this.findOne(id);
    if (!boardGame) {
      throw new ApolloError(`Board game with id "${id}" does not exist`, 'NOT_FOUND');
    }
    return boardGame;
  }

  async createBoardGame(resolvedBoardGameData: ResolvedBoardGameData): Promise<BoardGame> {
    const boardGame = new BoardGame();

    boardGame.title = resolvedBoardGameData.title;
    boardGame.description = resolvedBoardGameData.description;
    boardGame.smallThumbnail = resolvedBoardGameData.smallThumbnail;
    boardGame.thumbnail = resolvedBoardGameData.thumbnail;
    boardGame.publisher = resolvedBoardGameData.publisher;
    boardGame.publishedDate = resolvedBoardGameData.publishedDate;
    boardGame.averageRating = resolvedBoardGameData.averageRating;
    boardGame.ratingsCount = resolvedBoardGameData.ratingsCount;
    boardGame.minPlayers = resolvedBoardGameData.minPlayers;
    boardGame.maxPlayers = resolvedBoardGameData.maxPlayers;
    boardGame.minPlayTime = resolvedBoardGameData.minPlayTime;
    boardGame.maxPlayTime = resolvedBoardGameData.maxPlayTime;
    boardGame.boardGameAtlasUrl = resolvedBoardGameData.boardGameAtlasUrl;
    boardGame.officialUrl = resolvedBoardGameData.officialUrl;
    boardGame.rulesUrl = resolvedBoardGameData.rulesUrl;

    return boardGame.save();
  }
}
