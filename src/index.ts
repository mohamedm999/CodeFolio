import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { json } from 'body-parser';
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
  } | null;
}

const startServer = async () => {
  await connectDB();

  const app = express();
  const httpServer = http.createServer(app);
  const PORT = Number(process.env.PORT) || 4000;

  // Middleware
  app.use(morgan('combined', { stream: morganStream }));
  app.use(cors());
  app.use(json());

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    formatError: (error) => {
      logger.error('GraphQL Error:', error.message);
      return error;
    }
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    async (req, res) => {
      const user = getUser(req.headers.authorization);
      
      await server.executeOperation(
        {
          query: req.body.query,
          variables: req.body.variables,
          operationName: req.body.operationName
        },
        {
          contextValue: { user }
        }
      ).then(result => {
        res.json(result);
      });
    }
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  logger.info(`🚀 Server running on http://localhost:${PORT}/graphql`);
};

startServer();
