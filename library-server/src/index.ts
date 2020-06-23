import 'module-alias/register';
import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import { API_PREFIX, IS_PRODUCTION, PORT } from 'config';
import express, { Application, Request, Response } from 'express';
import path from 'path';
import * as auth from './authentication';
import * as database from './database';
import * as boardGames from './modules/board-games';
import * as books from './modules/books';
import * as common from './modules/common';
import * as loans from './modules/loans';
import * as user from './modules/user';

const serveStaticFilesInProduction = (app: Application): void => {
  if (IS_PRODUCTION) {
    app.use(express.static(path.join(__dirname + '/../../library-client/build')));

    app.get('*', (_: Request, res: Response) => {
      res.sendFile(path.join(__dirname + '/../../library-client/build/index.html'));
    });
  }
};

database.createDatabaseConnection().then(() => {
  console.log(`🖥️  DB connected`);
  const app = express();

  app.use(bodyParser.json());
  app.use(`${API_PREFIX}/auth`, auth.routes);

  const server = new ApolloServer({
    typeDefs: [common.typeDef, user.typeDefs, books.typeDefs, boardGames.typeDefs, loans.typeDefs],
    resolvers: [common.resolvers, user.resolvers, books.resolvers, boardGames.resolvers, loans.resolvers],
    context: ({ req }): common.AuthenticatedUserContext => auth.authenticateUser(req),
  });
  server.applyMiddleware({ app, path: `${API_PREFIX}/graphql` });

  serveStaticFilesInProduction(app);

  app.listen({ port: PORT }, () => {
    console.log(`🚀 Graphql ready at http://localhost:${PORT}${API_PREFIX}/graphql`);
  });
});
