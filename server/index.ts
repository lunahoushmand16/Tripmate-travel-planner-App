import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import db from './config/connection';
import { typeDefs } from './schemas/typeDefs';
import { resolvers } from './schemas/resolvers';
import { authMiddleware } from './utils/auth';

const app = express();
const PORT = process.env.PORT || 3001;

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
<<<<<<< HEAD
    context: authMiddleware,
    persistedQueries: false,
=======
    context: ({ req }: { req: Request }) => authMiddleware({ req }),
>>>>>>> ff4496c9840ec44555af5307d7f3e3c72db91974
  });

  await server.start();
  server.applyMiddleware({ app: app as any });

  // Express middleware
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

<<<<<<< HEAD
 const clientBuildPath = path.resolve(__dirname, '../../client/dist');
 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(clientBuildPath));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}
=======
  // Serve static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
>>>>>>> ff4496c9840ec44555af5307d7f3e3c72db91974

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer().catch((err) => {
  console.error('❌ Error starting Apollo Server:', err);
});