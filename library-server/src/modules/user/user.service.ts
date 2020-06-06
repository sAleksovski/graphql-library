import bcrypt from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import { User } from './user.entity';
import { InvalidCredentialsError, UserAlreadyExistsError } from './user.error';
import { UserRepository } from './user.repository';
import { LoginUser, RegisterUser, UserInfo } from './user.types';

class UserService {
  private get userRepository(): UserRepository {
    return getCustomRepository(UserRepository);
  }

  async login({ username, password }: LoginUser): Promise<number> {
    const user = await this.userRepository.findOne({ username });
    if (user) {
      const hash = await this.hashPassword(password, user.salt);

      if (user.password === hash) {
        return user.id;
      }
    }

    throw new InvalidCredentialsError();
  }

  async register({ username, password }: RegisterUser): Promise<number> {
    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      const savedUser = await this.userRepository.save(user);
      return savedUser.id;
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
      };
    }

    throw new Error('Unknown error');
  }

  private hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}

export const userService = new UserService();
