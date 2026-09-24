import dotenv from 'dotenv';
import morgan from 'morgan';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connectDB } from './config/database';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import { getUser } from './utils/auth';
import { logger } from './utils/logger';
import { morganStream } from './utils/morganStream';

dotenv.config();

interface MyContext {
  user?: {
    id: string;
    username: string;
    role: string;
    token?: string;
  } | null;
}

const startServer = async () => {
  await connectDB();

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    formatError: (error) => {
      logger.error(`GraphQL Error: ${error.message}`, { 
        extensions: error.extensions,
        path: error.path
      });
      console.error('Full error:', error);
      return error;
    }
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 4000 },
    context: async ({ req }: any) => {
      try {
        const user = await getUser(req.headers.authorization);
        logger.info(`Request from: ${user ? user.username : 'Anonymous'}`);
        return { user };
      } catch (error) {
        console.error('Context error:', error);
        logger.error('Context error:', error);
        throw error;
      }
    }
  });

  logger.info(`🚀 Server running at ${url}`);
};

startServer().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});
