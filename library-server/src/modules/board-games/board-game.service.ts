import { assertIsAdmin } from 'authentication/admin-guard';
import { AuthenticatedUserContext } from 'modules/common';
import { getCustomRepository } from 'typeorm';
import { findBoardGamesByTitle, resolveBoardGameDetails } from './board-game-data-resolver';
import { ResolvedBoardGameData } from './board-game-data-resolver/board-game-atlas.types';
import { BoardGame } from './board-game.entity';
import {
  CreateBoardGameByBoardGameAtlasIdInput,
  FindBoardGameFromBoardGameAtlasInput,
  IdInput,
} from './board-game.inputs';
import { BoardGameRepository } from './board-game.repository';

class BoardGameService {
  private get boardGameRepository(): BoardGameRepository {
    return getCustomRepository(BoardGameRepository);
  }

  async getBoardGames(): Promise<BoardGame[]> {
    return this.boardGameRepository.find();
  }

  async getBoardGameById({ id }: IdInput): Promise<BoardGame> {
    return this.boardGameRepository.findById(id);
  }

  async createBoardGameByBoardGameAtlasId(
    ctx: AuthenticatedUserContext,
    createBoardGameByBoardGameAtlasIdInput: CreateBoardGameByBoardGameAtlasIdInput,
  ): Promise<BoardGame> {
    assertIsAdmin(ctx);

    const resolvedBoardGameDetails = await resolveBoardGameDetails(
      createBoardGameByBoardGameAtlasIdInput.boardGameAtlasId,
    );
    return this.saveBoardGame(resolvedBoardGameDetails);
  }

  async findBoardGameFromBoardGameAtlas(
    ctx: AuthenticatedUserContext,
    { title }: FindBoardGameFromBoardGameAtlasInput,
  ): Promise<ResolvedBoardGameData[]> {
    assertIsAdmin(ctx);

    const boardGames = await findBoardGamesByTitle(title);

    const boardGameAtlasIds = boardGames.map((b: ResolvedBoardGameData) => b.id);

    const alreadyInDb = await this.boardGameRepository.findByBoardGameAtlasIds(boardGameAtlasIds);

    return boardGames.map((b: ResolvedBoardGameData) => ({
      ...b,
      alreadyAdded: !!alreadyInDb.find((t) => t.boardGameAtlasId === b.id),
    }));
  }

  private async saveBoardGame(boardGameData: ResolvedBoardGameData): Promise<BoardGame> {
    return this.boardGameRepository.createBoardGame(boardGameData);
  }
}

export const boardGameService = new BoardGameService();
