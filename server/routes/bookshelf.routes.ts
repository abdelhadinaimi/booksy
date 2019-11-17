import { Router } from 'express';
import { getAll } from '../controllers/bookshelf.controller';

const route = Router();

/**
 * @swagger
 * /bookshelves/:
 *  get:
 *    tags:
 *    - "bookshelf"
 *    description: gets all the bookshelves of the logged user
 *    responses:
 *      '200':
 *        description: Success!
 */
route.get('/', getAll);

export default route;
