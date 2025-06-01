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
    context: authMiddleware,
    persistedQueries: false,
  });

  await server.start();
  server.applyMiddleware({ app: app as any });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

 const clientBuildPath = path.resolve(__dirname, '../../client/dist');
 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(clientBuildPath));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer();