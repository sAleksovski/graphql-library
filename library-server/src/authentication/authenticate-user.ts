import { AuthenticationError } from 'apollo-server';
import { Request } from 'express';
import { AuthenticatedUserContext } from 'modules/common';
import { verifyToken } from './jwt';

const getAuthTokenFromRequest = (req: Request): string | null => {
  const header = req.get('Authorization') || '';
  const [bearer, token] = header.split(' ');
  return bearer === 'Bearer' && token ? token : null;
};

export const authenticateUser = (req: Request): AuthenticatedUserContext => {
  // Get the user token from the headers.
  const token = getAuthTokenFromRequest(req);

  if (!token) {
    throw new AuthenticationError('Authentication token not found.');
  }
  const { sub, roles } = verifyToken(token);
  if (!sub) {
    throw new AuthenticationError('Authentication token is invalid.');
  }
  return { userId: parseInt(sub), roles };
};
