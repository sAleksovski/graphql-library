import jwt, { SignOptions } from 'jsonwebtoken';
import { UserRole } from 'modules/user';

const JWT_SECRET = 'TopSecretDontUseInProduction!';

export interface JwtToken {
  sub: string;
  roles: UserRole[];
}

export const signToken = (payload: object, options?: SignOptions): string =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn: '180 days',
    ...options,
  });

export const verifyToken = (token: string): JwtToken => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (typeof payload === 'object') {
      return payload as JwtToken;
    }
    throw new Error();
  } catch (error) {
    throw new Error('Invalid token!');
  }
};
