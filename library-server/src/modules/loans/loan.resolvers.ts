import { IResolvers } from 'apollo-server';
import { BoardGame } from 'modules/board-games/board-game.entity';
import { Book } from 'modules/books/database/book.entity';
import { AuthenticatedUserContext } from 'modules/common';
import {
  ActiveLoanInput,
  ApproveLoanInput,
  PendingLoanInput,
  RejectLoanInput,
  RequestLoanInput,
  ReturnLoanInput,
} from './loan.input';
import { loanService } from './loan.service';
import { ActiveLoan, ActiveLoanInfo, MyLoan, PendingLoan, PendingLoanInfo } from './loan.types';

export const resolvers: IResolvers = {
  Query: {
    pendingLoansCount: (_, __, ctx: AuthenticatedUserContext): Promise<number> => loanService.getPendingLoansCount(ctx),
    pendingLoans: (_, __, ctx: AuthenticatedUserContext): Promise<PendingLoan[]> => loanService.getPendingLoans(ctx),
    pendingLoan: (_, pendingLoanInput: PendingLoanInput, ctx: AuthenticatedUserContext): Promise<PendingLoanInfo> =>
      loanService.getPendingLoan(ctx, pendingLoanInput.loanId),
    activeLoans: (_, __, ctx: AuthenticatedUserContext): Promise<ActiveLoan[]> => loanService.getActiveLoans(ctx),
    activeLoan: (_, activeLoanInput: ActiveLoanInput, ctx: AuthenticatedUserContext): Promise<ActiveLoanInfo> =>
      loanService.getActiveLoan(ctx, activeLoanInput.loanId),
    myLoans: (_, __, ctx: AuthenticatedUserContext): Promise<MyLoan[]> => loanService.getMyLoans(ctx.userId),
  },
  Mutation: {
    requestLoan: (_, requestLoanInput: RequestLoanInput, ctx: AuthenticatedUserContext): Promise<boolean> =>
      loanService.requestLoan(requestLoanInput.itemId, ctx.userId),
    approveLoan: (_, approveLoanInput: ApproveLoanInput, ctx: AuthenticatedUserContext): Promise<boolean> =>
      loanService.approveLoan(ctx, approveLoanInput),
    rejectLoan: (_, rejectLoanInput: RejectLoanInput, ctx: AuthenticatedUserContext): Promise<boolean> =>
      loanService.rejectLoan(ctx, rejectLoanInput),
    returnLoan: (_, returnLoanInput: ReturnLoanInput, ctx: AuthenticatedUserContext): Promise<boolean> =>
      loanService.returnLoan(ctx, returnLoanInput),
  },
  LibraryItem: {
    __resolveType(entity: Book | BoardGame): string {
      if (entity.type === 'BOOK') return 'Book';
      return 'BoardGame';
    },
  },
};
