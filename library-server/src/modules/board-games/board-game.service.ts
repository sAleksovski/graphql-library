import { assertIsAdmin } from 'authentication/admin-guard';
import { AuthenticatedUserContext } from 'modules/common';
import { getCustomRepository } from 'typeorm';
import { resolveBoardGameDetails } from './board-game-data-resolver';
import { ResolvedBoardGameData } from './board-game-data-resolver/board-game-atlas.types';
import { BoardGame } from './board-game.entity';
import { CreateBoardGameByBoardGameAtlasIdInput, IdInput } from './board-game.inputs';
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
    createBookByIsbnInput: CreateBoardGameByBoardGameAtlasIdInput,
  ): Promise<BoardGame> {
    assertIsAdmin(ctx);

    const resolvedBoardGameDetails = await resolveBoardGameDetails(createBookByIsbnInput.boardGameAtlasId);
    return this.saveBoardGame(resolvedBoardGameDetails);
  }

  private async saveBoardGame(boardGameData: ResolvedBoardGameData): Promise<BoardGame> {
    return this.boardGameRepository.createBoardGame(boardGameData);
  }
}

export const boardGameService = new BoardGameService();
