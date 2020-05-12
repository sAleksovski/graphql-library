import { ApolloServer } from 'apollo-server';
import * as common from './common';
import * as database from './database';
import * as boardGames from './modules/board-games';
import * as books from './modules/books';

database
  .createDatabaseConnection()
  .then(() => {
    console.log(` 🖥️ DB connected`);
    const server = new ApolloServer({
      typeDefs: [common.typeDef, books.typeDefs, boardGames.typeDefs],
      resolvers: [books.resolvers, boardGames.resolvers],
    });
    return server.listen();
  })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
