import { Router } from 'express';
import { searchBooks, getBook } from '../controllers/book.controller';

const route = Router();

/**
 * @swagger
 * /books:
 *  get:
 *    tags:
 *    - "book"
 *    summary: performs a book search
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

/**
 * @swagger
 * /books/{bookId}:
 *  parameters:
 *    - in: path
 *      name: bookId
 *      schema:
 *        type: string
 *  get:
 *    tags:
 *    - "book"
 *    summary: get a book info
 *    description: get a book info
 *    parameters:
 *    responses:
 *      '200':
 *        description: Success!
 *        schema:
 *          $ref: "#/definitions/Book"
 */
route.get('/:id', getBook);

/**
 * @swagger
 * /books/{bookId}/{reviewId}:
 *  parameters:
 *    - in: path
 *      name: bookId
 *      schema:
 *        type: string
 *    - in: path
 *      name: reviewId
 *      schema:
 *        type: string
 *  post:
 *    parameters:
 *      - in: body
 *        name: body
 *        schema:
 *          $ref: "#/definitions/Review"
 *    tags:
 *    - "book"
 *    summary: create a new review for the book
 *    description: create a new review for the book
 *    responses:
 *      '200':
 *        description: Success!
 *  put:
 *    parameters:
 *      - in: body
 *        name: body
 *        schema:
 *          $ref: "#/definitions/Review"
 *    tags:
 *    - "book"
 *    summary: updates review for the book
 *    description: updates review for the book
 *    responses:
 *      '200':
 *        description: Success!
 *  delete:
 *    tags:
 *    - "book"
 *    summary: deletes a review for the book
 *    description: deletes a review for the book
 *    responses:
 *      '200':
 *        description: Success!
 */

export default route;
