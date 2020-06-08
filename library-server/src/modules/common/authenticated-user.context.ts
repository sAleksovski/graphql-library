import { UserRole } from 'modules/user';

export interface AuthenticatedUserContext {
  userId: number;
  roles: UserRole[];
}
