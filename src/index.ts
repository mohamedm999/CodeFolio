import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connectDB } from './config/database';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import { getUser } from './utils/auth';
import { logger } from './utils/logger';

dotenv.config();

const startServer = async () => {
  await connectDB();

  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    formatError: (error) => {
      logger.error('GraphQL Error:', error.message);
      return error;
    }
  });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 4000 },
    context: async ({ req }) => {
      const user = getUser(req.headers.authorization);
      logger.info(`Request from: ${user ? user.username : 'Anonymous'}`);
      return { user };
    }
  });

  logger.info(`🚀 Server running at ${url}`);
};

startServer();
