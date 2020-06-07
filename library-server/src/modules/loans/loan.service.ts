import { ApolloError } from 'apollo-server';
import { LoanableItem } from 'modules/common';
import { User } from 'modules/user';
import { createQueryBuilder } from 'typeorm';
import { LoanEvent } from './loan-event.entity';
import { ApproveLoanInput, RejectLoanInput } from './loan.input';
import { LoanEventType, LoanHistory, LoanInfo, PendingLoan } from './loan.types';

type LoanInfoWithoutHistory = Omit<LoanInfo, 'loanHistory'>;

class LoanService {
  async requestLoan(itemId: number, userId: number): Promise<boolean> {
    const loanInfo = await this.getLoanInfo(itemId);
    if (!loanInfo.canLoan) {
      throw new ApolloError('Cannot loan item');
    }
    const loanEvent = new LoanEvent();
    loanEvent.item = await this.getLoanableItem(itemId);
    loanEvent.user = this.getUser(userId);
    loanEvent.type = LoanEventType.LOAN_REQUESTED;
    await loanEvent.save();
    return true;
  }

  async approveLoan({ loanEventId }: ApproveLoanInput, userId: number): Promise<boolean> {
    const loanEvent = await this.verifyCanApproveOrReject(loanEventId);

    const approvelLoanEvent = new LoanEvent();
    approvelLoanEvent.item = loanEvent.item;
    approvelLoanEvent.user = this.getUser(userId);
    approvelLoanEvent.type = LoanEventType.LOAN_APPROVED;
    await approvelLoanEvent.save();

    return true;
  }

  async rejectLoan({ loanEventId, reason }: RejectLoanInput, userId: number): Promise<boolean> {
    const loanEvent = await this.verifyCanApproveOrReject(loanEventId);

    const rejectLoanEvent = new LoanEvent();
    rejectLoanEvent.item = loanEvent.item;
    rejectLoanEvent.user = this.getUser(userId);
    rejectLoanEvent.type = LoanEventType.LOAN_REJECTED;
    rejectLoanEvent.reason = reason;
    await rejectLoanEvent.save();

    return true;
  }

  async getLoanInfo(loanableItemId: number): Promise<LoanInfo> {
    const events = await createQueryBuilder(LoanEvent, 'loanEvent')
      .leftJoinAndSelect('loanEvent.user', 'user')
      .where('loanEvent.item.id = :loanableItemId', { loanableItemId })
      .getMany();

    const partialLoanInfo = this.replayLoanEvents(events);
    const loanHistory = this.generateLoanHistory(events);

    return {
      ...partialLoanInfo,
      loanHistory,
    };
  }

  async getPendingLoans(): Promise<PendingLoan[]> {
    const lastEventPerLoanableItem = await createQueryBuilder(LoanEvent, 'loanEvent')
      .distinctOn(['loanEvent.item.id'])
      .orderBy({
        'loanEvent.item.id': 'ASC',
        'loanEvent.createdAt': 'DESC',
      })
      .leftJoinAndSelect('loanEvent.user', 'user')
      .leftJoinAndSelect('loanEvent.item', 'item')
      .getMany();

    const pendingLoanEvents = lastEventPerLoanableItem.filter((event) => event.type === LoanEventType.LOAN_REQUESTED);

    const pendingLoans: PendingLoan[] = pendingLoanEvents.map((event) => ({
      id: event.id,
      item: event.item,
      requestedAt: event.createdAt,
      user: event.user,
    }));

    return pendingLoans;
  }

  async verifyCanApproveOrReject(loanEventId: number): Promise<LoanEvent> {
    const loanEvent = await LoanEvent.findOne(loanEventId, {
      relations: ['item'],
    });

    if (!loanEvent) {
      throw new ApolloError('Loan request does not exist');
    }

    const lastEventForItem = await LoanEvent.findOne(
      {
        item: loanEvent.item,
      },
      {
        order: {
          createdAt: 'DESC',
        },
      },
    );

    if (loanEvent.id !== lastEventForItem?.id) {
      throw new ApolloError('Loan already approved or rejected');
    }

    return loanEvent;
  }

  private generateLoanHistory(events: LoanEvent[]): LoanHistory[] {
    const meaningfulEvents = events.filter((event: LoanEvent) =>
      [LoanEventType.LOAN_APPROVED, LoanEventType.LOAN_FINISHED].includes(event.type),
    );
    const history: LoanHistory[] = [];
    let newHistoryItem: Partial<LoanHistory> = {};

    for (const event of meaningfulEvents) {
      if (event.type === LoanEventType.LOAN_APPROVED) {
        newHistoryItem.user = event.user;
        newHistoryItem.loanStart = event.createdAt;
      }
      if (event.type === LoanEventType.LOAN_FINISHED) {
        newHistoryItem.loanEnd = event.createdAt;
        history.push(newHistoryItem as LoanHistory);
        newHistoryItem = {};
      }
    }

    if (newHistoryItem.user) {
      history.push(newHistoryItem as LoanHistory);
    }

    return history;
  }

  private replayLoanEvents(events: LoanEvent[]): LoanInfoWithoutHistory {
    return events.reduce(
      (memo: LoanInfoWithoutHistory, item: LoanEvent) => {
        switch (item.type) {
          case LoanEventType.LOAN_REQUESTED:
            return {
              ...memo,
              canLoan: false,
              hasPendingLoan: true,
              loaned: false,
            };
          case LoanEventType.LOAN_APPROVED:
            return {
              ...memo,
              canLoan: false,
              hasPendingLoan: false,
              loaned: true,
            };
          case LoanEventType.LOAN_REJECTED:
            return {
              ...memo,
              canLoan: true,
              hasPendingLoan: false,
              loaned: false,
            };
          case LoanEventType.LOAN_FINISHED:
            return {
              ...memo,
              canLoan: true,
              hasPendingLoan: false,
              loaned: false,
            };
          default:
            return memo;
        }
      },
      {
        canLoan: true,
        hasPendingLoan: false,
        loaned: false,
      },
    );
  }

  private async getLoanableItem(itemId: number): Promise<LoanableItem> {
    const loanableItem = await LoanableItem.findOne(itemId);
    if (loanableItem) {
      return loanableItem;
    }
    throw new ApolloError(`Item with id "${itemId}" does not exist`, 'NOT_FOUND');
  }

  private getUser(userId: number): User {
    const user = new User();
    user.id = userId;
    return user;
  }
}

export const loanService = new LoanService();
