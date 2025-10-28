import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connectDB } from './config/database';
import { typeDefs } from './graphql/typeDefs';

dotenv.config();

  
const startServer = async () => {
  await connectDB();

  const server = new ApolloServer({ typeDefs, resolvers });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 4000 }
  });

  console.log(`🚀 Server running at ${url}`);
};

startServer();