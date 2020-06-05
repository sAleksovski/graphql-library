import { IResolvers } from 'apollo-server';
import { AuthenticatedUserContext } from './authenticated-user.context';
import { commentService } from './comment.service';
import { CreateCommentInput } from './common.inputs';
import { Comment } from './database';

export const resolvers: IResolvers = {
  Mutation: {
    createComment: (_, createCommentInput: CreateCommentInput, ctx: AuthenticatedUserContext): Promise<Comment[]> =>
      commentService.createComment(createCommentInput, ctx.userId),
  },
};
