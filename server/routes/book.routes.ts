import { Router } from 'express';
import { searchBooks, getBook } from '../controllers/book.controller';

const route = Router();

/**
 * @swagger
 * /books:
 *  get:
 *    tags:
 *    - "book"
 *    description: performs a book search
 *    parameters:
 *      - in: query
 *        name: q
 *        schema:
 *          type: string
 *        description: Full-text search query string
 *    responses:
 *      '200':
 *        description: Success!
 */
route.get('/', searchBooks);

/**
 * @swagger
 * /books:
 *  get:
 *    tags:
 *    - "book"
 *    description: performs a book search
 *    parameters:
 *      - in: query
 *        name: q
 *        schema:
 *          type: string
 *        description: Full-text search query string
 *    responses:
 *      '200':
 *        description: Success!
 */
route.get('/{:id}', getBook);

export default route;
