import { ApolloError } from 'apollo-server';
import { LibraryItem } from 'modules/common';
import { User } from 'modules/user';
import { createQueryBuilder } from 'typeorm';
import { LoanEvent } from './loan-event.entity';
import { ApproveLoanInput, RejectLoanInput, ReturnLoanInput } from './loan.input';
import {
  ActiveLoan,
  ActiveLoanInfo,
  LoanEventType,
  LoanHistory,
  LoanHistoryWithItem,
  LoanInfo,
  MyLoan,
  PendingLoan,
  PendingLoanInfo,
} from './loan.types';

type LoanInfoWithoutHistory = Omit<LoanInfo, 'loanHistory'>;

class LoanService {
  async requestLoan(itemId: number, userId: number): Promise<boolean> {
    const loanInfo = await this.getLoanInfo(itemId, userId);
    if (!loanInfo.canLoan) {
      throw new ApolloError('Cannot loan item');
    }
    const loanEvent = new LoanEvent();
    loanEvent.item = await this.getLibraryItem(itemId);
    loanEvent.user = this.getUser(userId);
    loanEvent.type = LoanEventType.LOAN_REQUESTED;
    await loanEvent.save();
    return true;
  }

  async approveLoan({ loanEventId }: ApproveLoanInput, userId: number): Promise<boolean> {
    const loanEvent = await this.verifyCanApproveOrReject(loanEventId);

    const approvelLoanEvent = new LoanEvent();
    approvelLoanEvent.item = loanEvent.item;
    approvelLoanEvent.user = loanEvent.user;
    approvelLoanEvent.admin = this.getUser(userId);
    approvelLoanEvent.type = LoanEventType.LOAN_APPROVED;
    await approvelLoanEvent.save();

    return true;
  }

  async rejectLoan({ loanEventId, reason }: RejectLoanInput, userId: number): Promise<boolean> {
    const loanEvent = await this.verifyCanApproveOrReject(loanEventId);

    const rejectLoanEvent = new LoanEvent();
    rejectLoanEvent.item = loanEvent.item;
    rejectLoanEvent.user = loanEvent.user;
    rejectLoanEvent.admin = this.getUser(userId);
    rejectLoanEvent.type = LoanEventType.LOAN_REJECTED;
    rejectLoanEvent.reason = reason;
    await rejectLoanEvent.save();

    return true;
  }

  async returnLoan({ loanEventId }: ReturnLoanInput, userId: number): Promise<boolean> {
    const approvedEvent = await LoanEvent.findOne(
      {
        id: loanEventId,
        type: LoanEventType.LOAN_APPROVED,
      },
      {
        relations: ['user', 'item'],
      },
    );
    if (!approvedEvent) {
      throw new ApolloError('Cannot loan item');
    }

    const loanEvent = new LoanEvent();
    loanEvent.item = approvedEvent.item;
    loanEvent.user = approvedEvent.user;
    loanEvent.admin = this.getUser(userId);
    loanEvent.type = LoanEventType.LOAN_FINISHED;
    await loanEvent.save();
    return true;
  }

  async getLoanInfo(libraryItemId: number, userId: number): Promise<LoanInfo> {
    const events = await createQueryBuilder(LoanEvent, 'loanEvent')
      .leftJoinAndSelect('loanEvent.user', 'user')
      .where('loanEvent.item.id = :libraryItemId', { libraryItemId })
      .getMany();

    const partialLoanInfo = this.replayLoanEvents(events, userId);
    const loanHistory = this.generateLoanHistory(events);

    return {
      ...partialLoanInfo,
      loanHistory,
    };
  }

  async getPendingLoans(): Promise<PendingLoan[]> {
    const lastEventPerLibraryItem = await createQueryBuilder(LoanEvent, 'loanEvent')
      .distinctOn(['loanEvent.item.id'])
      .orderBy({
        'loanEvent.item.id': 'ASC',
        'loanEvent.createdAt': 'DESC',
      })
      .leftJoinAndSelect('loanEvent.user', 'user')
      .leftJoinAndSelect('loanEvent.item', 'item')
      .getMany();

    const pendingLoanEvents = lastEventPerLibraryItem.filter((event) => event.type === LoanEventType.LOAN_REQUESTED);

    const pendingLoans: PendingLoan[] = pendingLoanEvents.map((event) => ({
      id: event.id,
      item: event.item,
      requestedAt: event.createdAt,
      user: event.user,
    }));

    return pendingLoans;
  }

  async getPendingLoan(loanId: number): Promise<PendingLoanInfo> {
    const loanForEvent = await LoanEvent.findOne(
      { id: loanId, type: LoanEventType.LOAN_REQUESTED },
      {
        relations: ['user', 'item'],
      },
    );
    if (!loanForEvent) {
      throw new ApolloError('Loan request does not exist');
    }
    const loanEventsPerUser = await createQueryBuilder(LoanEvent, 'loanEvent')
      .where('loanEvent.user.id = :userId', { userId: loanForEvent.user.id })
      .orderBy({
        'loanEvent.createdAt': 'ASC',
      })
      .leftJoinAndSelect('loanEvent.item', 'item')
      .leftJoinAndSelect('loanEvent.user', 'user')
      .getMany();

    const userLoanHistory = this.generateUserLoanHistory(loanEventsPerUser);

    return {
      id: loanId,
      item: loanForEvent.item,
      requestedAt: loanForEvent.createdAt,
      user: loanForEvent.user,
      userLoanHistory,
    };
  }

  async getActiveLoans(): Promise<ActiveLoan[]> {
    const lastEventPerLibraryItem = await createQueryBuilder(LoanEvent, 'loanEvent')
      .distinctOn(['loanEvent.item.id'])
      .orderBy({
        'loanEvent.item.id': 'ASC',
        'loanEvent.createdAt': 'DESC',
      })
      .leftJoinAndSelect('loanEvent.user', 'user')
      .leftJoinAndSelect('loanEvent.item', 'item')
      .getMany();

    const activeLoanEvents = lastEventPerLibraryItem.filter((event) => event.type === LoanEventType.LOAN_APPROVED);

    const activeLoans: ActiveLoan[] = activeLoanEvents.map((event) => ({
      id: event.id,
      item: event.item,
      loanedAt: event.createdAt,
      user: event.user,
    }));

    return activeLoans;
  }

  async getActiveLoan(loanId: number): Promise<ActiveLoanInfo> {
    const loanForEvent = await LoanEvent.findOne(
      { id: loanId, type: LoanEventType.LOAN_APPROVED },
      {
        relations: ['user', 'item'],
      },
    );
    if (!loanForEvent) {
      throw new ApolloError('Loan request does not exist');
    }
    const loanEventsPerUser = await createQueryBuilder(LoanEvent, 'loanEvent')
      .where('loanEvent.user.id = :userId', { userId: loanForEvent.user.id })
      .orderBy({
        'loanEvent.createdAt': 'ASC',
      })
      .leftJoinAndSelect('loanEvent.item', 'item')
      .leftJoinAndSelect('loanEvent.user', 'user')
      .getMany();

    const userLoanHistory = this.generateUserLoanHistory(loanEventsPerUser);

    return {
      id: loanId,
      item: loanForEvent.item,
      loanedAt: loanForEvent.createdAt,
      user: loanForEvent.user,
      userLoanHistory,
    };
  }

  async getMyLoans(userId: number): Promise<MyLoan[]> {
    const loanEventsPerUser = await createQueryBuilder(LoanEvent, 'loanEvent')
      .where('loanEvent.user.id = :userId', { userId })
      .orderBy({
        'loanEvent.createdAt': 'ASC',
      })
      .leftJoinAndSelect('loanEvent.item', 'item')
      .leftJoinAndSelect('loanEvent.user', 'user')
      .getMany();

    return this.generateMyLoanHistory(loanEventsPerUser);
  }

  private async verifyCanApproveOrReject(loanEventId: number): Promise<LoanEvent> {
    const loanEvent = await LoanEvent.findOne(loanEventId, {
      relations: ['item', 'user'],
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

  private replayLoanEvents(events: LoanEvent[], userId: number): LoanInfoWithoutHistory {
    return events.reduce(
      (memo: LoanInfoWithoutHistory, item: LoanEvent) => {
        switch (item.type) {
          case LoanEventType.LOAN_REQUESTED:
            return {
              ...memo,
              canLoan: false,
              hasPendingLoan: item.user.id === userId,
              loanedToUser: false,
            };
          case LoanEventType.LOAN_APPROVED:
            return {
              ...memo,
              canLoan: false,
              hasPendingLoan: false,
              loanedToUser: item.user.id === userId,
            };
          case LoanEventType.LOAN_REJECTED:
            return {
              ...memo,
              canLoan: true,
              hasPendingLoan: false,
              loanedToUser: false,
            };
          case LoanEventType.LOAN_FINISHED:
            return {
              ...memo,
              canLoan: true,
              hasPendingLoan: false,
              loanedToUser: false,
            };
          default:
            return memo;
        }
      },
      {
        canLoan: true,
        hasPendingLoan: false,
        loanedToUser: false,
      },
    );
  }

  private generateUserLoanHistory(events: LoanEvent[]): LoanHistoryWithItem[] {
    const meaningfulEvents = events.filter((event: LoanEvent) =>
      [LoanEventType.LOAN_APPROVED, LoanEventType.LOAN_FINISHED].includes(event.type),
    );
    const history: LoanHistoryWithItem[] = [];

    const eventsPerItem: { [key: string]: LoanEvent[] } = meaningfulEvents.reduce(
      (memo: { [key: string]: LoanEvent[] }, event: LoanEvent) => ({
        ...memo,
        [event.item.id]: [...(memo[event.item.id] || []), event],
      }),
      {},
    );

    Object.values(eventsPerItem).forEach((events: LoanEvent[]) => {
      let newHistoryItem: Partial<LoanHistoryWithItem> = {};

      for (const event of events) {
        if (event.type === LoanEventType.LOAN_APPROVED) {
          newHistoryItem.user = event.user;
          newHistoryItem.loanStart = event.createdAt;
          newHistoryItem.item = event.item;
        }
        if (event.type === LoanEventType.LOAN_FINISHED) {
          newHistoryItem.loanEnd = event.createdAt;
          history.push(newHistoryItem as LoanHistoryWithItem);
          newHistoryItem = {};
        }
      }

      if (newHistoryItem.user) {
        history.push(newHistoryItem as LoanHistoryWithItem);
      }
    });

    return history;
  }

  private generateMyLoanHistory(events: LoanEvent[]): MyLoan[] {
    const history: MyLoan[] = [];

    const eventsPerItem: { [key: string]: LoanEvent[] } = events.reduce(
      (memo: { [key: string]: LoanEvent[] }, event: LoanEvent) => ({
        ...memo,
        [event.item.id]: [...(memo[event.item.id] || []), event],
      }),
      {},
    );

    Object.values(eventsPerItem).forEach((events: LoanEvent[]) => {
      let newHistoryItem: Partial<MyLoan> = {};

      for (const event of events) {
        newHistoryItem.status = event.type;
        newHistoryItem.item = event.item;
        newHistoryItem.id = event.id;

        if (event.type === LoanEventType.LOAN_REQUESTED) {
          newHistoryItem.loanRequested = event.createdAt;
        }
        if (event.type === LoanEventType.LOAN_APPROVED) {
          newHistoryItem.loanDecided = event.createdAt;
        }
        if (event.type === LoanEventType.LOAN_REJECTED) {
          newHistoryItem.loanDecided = event.createdAt;
          newHistoryItem.reason = event.reason;
          history.push(newHistoryItem as MyLoan);
          newHistoryItem = {};
        }
        if (event.type === LoanEventType.LOAN_FINISHED) {
          newHistoryItem.loanFinished = event.createdAt;
          history.push(newHistoryItem as MyLoan);
          newHistoryItem = {};
        }
      }

      if (newHistoryItem.status) {
        history.push(newHistoryItem as MyLoan);
      }
    });

    return history;
  }

  private async getLibraryItem(itemId: number): Promise<LibraryItem> {
    const libraryItem = await LibraryItem.findOne(itemId);
    if (libraryItem) {
      return libraryItem;
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
