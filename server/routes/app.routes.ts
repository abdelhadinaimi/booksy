import bookshelfRoutes from './bookshelf.routes';
import bookRoutes from './book.routes';
import userRoutes from './user.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/bookshelves', bookshelfRoutes);
routes.use('/user', userRoutes);
routes.use('/books', bookRoutes);

export default routes;
