import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import db from './config/connection';
import { typeDefs } from './schemas/typeDefs';
import { resolvers } from './schemas/resolvers';
import { authMiddleware } from './utils/auth';

const app = express();
const PORT = process.env.PORT || 3001;

// Main function to start Apollo Server and Express app

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

if (process.env.ENABLE_GRAPHQL !== 'false') {
  (async () => {
    await server.start();
    server.applyMiddleware({ app: app as any });
  })();

  // Express middleware
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

// Serve static files from the client build in production

const clientBuildPath = path.resolve(__dirname, '../../client/dist');
 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(clientBuildPath));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

  // Start the server after MongoDB connection is open
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}