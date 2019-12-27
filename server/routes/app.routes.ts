import bookshelfRoutes from './bookshelf.routes';
import bookRoutes from './book.routes';
import userRoutes from './user.routes';
import { Router } from 'express';
import { checkJwt } from '../config/auth.config';

const routes = Router();
routes.use('/bookshelves', checkJwt , bookshelfRoutes);
routes.use('/user', userRoutes);
routes.use('/books', bookRoutes);

export default routes;
