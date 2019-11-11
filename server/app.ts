import express, { Router } from 'express';

import Logger from './config/logger.config';
import swagger from './config/swagger.config';
import bookshelfRoutes from './routes/bookshelf.routes';

// Create a new express application instance
const app = express();
const routes = Router();
routes.use('/bookshelves', bookshelfRoutes);

app.use('/api-docs', swagger);
app.use('/api/v1/', routes);

app.listen(3000, () => {
  Logger.info('Example app listening on port 3000!');
});
