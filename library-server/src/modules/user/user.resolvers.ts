import { IResolvers } from 'apollo-server';

interface User {
  id: number;
  name: string;
  avatarUrl: string;
}

export const resolvers: IResolvers = {
  Query: {
    userInfo: (): User => ({
      id: 1,
      name: 'Stefan Aleksovski',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/7473800',
    }),
  },
};
