import { ApolloServer, gql } from 'apollo-server';
import { DocumentNode } from 'graphql';
import * as boardGames from './board-games';
import * as books from './books';

const typeDef: DocumentNode = gql`
  type Query
`;

const server = new ApolloServer({
  typeDefs: [typeDef, books.typeDefs, boardGames.typeDefs],
  resolvers: [books.resolvers, boardGames.resolvers],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
