import { ApolloError } from 'apollo-server';
import { User } from 'modules/user';
import { CreateCommentInput } from './common.inputs';
import { Comment, LoanableItem } from './database';

class CommentService {
  async createComment({ comment: { itemId, content } }: CreateCommentInput, userId: number): Promise<Comment[]> {
    const loanableItem = await this.getLoanableItem(itemId);
    const user = this.getUser(userId);
    const comment = this.buildComment(loanableItem, user, content);
    await comment.save();
    return loanableItem.comments;
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

  private buildComment(loanableItem: LoanableItem, user: User, content: string): Comment {
    const comment = new Comment();
    comment.item = loanableItem;
    comment.user = Promise.resolve(user);
    comment.content = content;
    return comment;
  }
}

export const commentService = new CommentService();
