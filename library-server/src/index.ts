import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as auth from './authentication';
import * as database from './database';
import * as boardGames from './modules/board-games';
import * as books from './modules/books';
import * as common from './modules/common';
import * as user from './modules/user';

database.createDatabaseConnection().then(() => {
  console.log(` 🖥️ DB connected`);
  const app = express();

  app.use(bodyParser.json());
  app.use(
    cors({
      origin: 'http://localhost:3000',
    }),
  );
  app.use('/auth', auth.routes);

  const server = new ApolloServer({
    typeDefs: [common.typeDef, user.typeDefs, books.typeDefs, boardGames.typeDefs],
    resolvers: [user.resolvers, books.resolvers, boardGames.resolvers],
    context: ({ req }): auth.AuthenticatedUser => auth.authenticateUser(req),
  });
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Graphql ready at http://localhost:4000/graphql`);
  });
});
