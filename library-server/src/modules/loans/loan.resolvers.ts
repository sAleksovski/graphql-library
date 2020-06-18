import { IResolvers } from 'apollo-server';
import { BoardGame } from 'modules/board-games/board-game.entity';
import { Book } from 'modules/books/database/book.entity';
import { AuthenticatedUserContext } from 'modules/common';
import { ApproveLoanInput, PendingLoanInput, RejectLoanInput, RequestLoanInput } from './loan.input';
import { loanService } from './loan.service';
import { PendingLoan, PendingLoanInfo } from './loan.types';

export const resolvers: IResolvers = {
  Query: {
    pendingLoans: (): Promise<PendingLoan[]> => loanService.getPendingLoans(),
    pendingLoan: (_, pendingLoanInput: PendingLoanInput): Promise<PendingLoanInfo> =>
      loanService.getPendingLoan(pendingLoanInput.loanId),
  },
  Mutation: {
    requestLoan: (_, requestLoanInput: RequestLoanInput, ctx: AuthenticatedUserContext): Promise<boolean> =>
      loanService.requestLoan(requestLoanInput.itemId, ctx.userId),
    approveLoan: (_, approveLoanInput: ApproveLoanInput, ctx: AuthenticatedUserContext): Promise<boolean> =>
      loanService.approveLoan(approveLoanInput, ctx.userId),
    rejectLoan: (_, rejectLoanInput: RejectLoanInput, ctx: AuthenticatedUserContext): Promise<boolean> =>
      loanService.rejectLoan(rejectLoanInput, ctx.userId),
  },
  LoanableItem: {
    __resolveType(entity: Book | BoardGame): string {
      if (entity.type === 'BOOK') return 'Book';
      return 'BoardGame';
    },
  },
};
