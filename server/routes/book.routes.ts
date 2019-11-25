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
 *      - in: query
 *        name: startIndex
 *        schema:
 *          type: number
 *        description: Index of the first result to return (starts at 0)
 *      - in: query
 *        name: maxResults
 *        schema:
 *          type: number
 *        description: Maximum number of results to return. Acceptable values are 0 to 40, inclusive.
 *      - in: query
 *        name: orderBy
 *        schema:
 *          type: string
 *          enum:
 *            - newest
 *            - relevance
 *        description: Sort search results.
 *    responses:
 *      '200':
 *        description: Success!
 */
route.get('/', searchBooks);

route.get('/{:id}', getBook);

export default route;
