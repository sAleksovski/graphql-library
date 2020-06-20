import { ApolloError } from 'apollo-server';
import { User } from 'modules/user';
import { CreateCommentInput } from './common.inputs';
import { Comment, LibraryItem } from './database';

class CommentService {
  async createComment({ comment: { itemId, content } }: CreateCommentInput, userId: number): Promise<Comment[]> {
    const libraryItem = await this.getLibraryItem(itemId);
    const user = this.getUser(userId);
    const comment = this.buildComment(libraryItem, user, content);
    await comment.save();
    return libraryItem.comments;
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

  private buildComment(libraryItem: LibraryItem, user: User, content: string): Comment {
    const comment = new Comment();
    comment.item = libraryItem;
    comment.user = Promise.resolve(user);
    comment.content = content;
    return comment;
  }
}

export const commentService = new CommentService();
