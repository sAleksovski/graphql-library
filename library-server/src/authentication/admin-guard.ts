import { ApolloError } from 'apollo-server';
import { AuthenticatedUserContext } from 'modules/common';
import { UserRole } from 'modules/user';

export function assertIsAdmin(ctx: AuthenticatedUserContext): void {
  if (!ctx.roles.includes(UserRole.ADMIN)) {
    throw new ApolloError('You must be admin in order to perform this action');
  }
}
