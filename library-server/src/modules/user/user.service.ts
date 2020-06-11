import bcrypt from 'bcrypt';
import { AuthenticatedUserContext } from 'modules/common';
import { getCustomRepository } from 'typeorm';
import { User } from './user.entity';
import { InvalidCredentialsError, UserAlreadyExistsError } from './user.error';
import { UserRepository } from './user.repository';
import { LoginUser, RegisterUser, UserInfo, UserRole } from './user.types';

class UserService {
  private get userRepository(): UserRepository {
    return getCustomRepository(UserRepository);
  }

  async login({ username, password }: LoginUser): Promise<AuthenticatedUserContext> {
    const user = await this.userRepository.findOne({ username });
    if (user) {
      const hash = await this.hashPassword(password, user.salt);

      if (user.password === hash) {
        return {
          userId: user.id,
          roles: user.roles,
        };
      }
    }

    throw new InvalidCredentialsError();
  }

  async register({ username, password, name }: RegisterUser): Promise<AuthenticatedUserContext> {
    const user = new User();
    user.name = name;
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.roles = [UserRole.USER];

    try {
      const savedUser = await this.userRepository.save(user);
      return {
        userId: savedUser.id,
        roles: savedUser.roles,
      };
    } catch (error) {
      if (error.detail.includes('already exists')) {
        throw new UserAlreadyExistsError();
      }
      throw new Error(error);
    }
  }

  async getUserInfo(id: number): Promise<UserInfo> {
    const user = await this.userRepository.findOne({ id });
    if (user) {
      return {
        id: user.id,
        name: user.name || user.username,
        avatarUrl: user.avatarUrl,
        roles: user.roles,
      };
    }

    throw new Error('Unknown error');
  }

  private hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}

export const userService = new UserService();
