import { IResolvers } from 'apollo-server';
import { AuthenticatedUserContext } from 'modules/common';
import { userService } from './user.service';
import { UserInfo } from './user.types';

export const resolvers: IResolvers = {
  Query: {
    userInfo: (_, __, ctx: AuthenticatedUserContext): Promise<UserInfo> => userService.getUserInfo(ctx.userId),
  },
};
