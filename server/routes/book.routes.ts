import { Router } from 'express';
import { searchBooks, getBook } from '../controllers/book.controller';
import { validate, bookSearchValidations, getBookValidations, reviewValidations } from '../config/validation.config';
import { putReview } from '../controllers/review.controller';
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
 *        schema:
 *          type: object
 *          properties:
 *            totalItems:
 *              type: number
 *            items:
 *              type: array
 *              items:
 *                $ref: "#/definitions/Volume"
 */
route.get('/', bookSearchValidations, validate, searchBooks);

/**
 * @swagger
 * /books/{bookId}:
 *  parameters:
 *    - in: path
 *      name: bookId
 *      schema:
 *        type: string
 *      description: the id of a book
 *    - in: query
 *      name: rid
 *      schema:
 *        type: string
 *      description: recommendation id
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
route.get('/:bookId', getBookValidations, validate, getBook);

/**
 * @swagger
 * /books/{bookId}/reviews/:
 *  parameters:
 *    - in: path
 *      name: bookId
 *      schema:
 *        type: string
 *  put:
 *    parameters:
 *      - in: body
 *        name: body
 *        schema:
 *          $ref: "#/definitions/ReviewDto"
 *      - in: query
 *        name: rid
 *        schema:
 *          type: string
 *        description: recommendation id
 *    tags:
 *    - "book"
 *    summary: create a new review for the book
 *    description: create a new review for the book
 *    responses:
 *      '200':
 *        description: Success!
 */
route.put('/:bookId/reviews', reviewValidations, validate, putReview);
/**
 * @swagger
 * /books/{bookId}/reviews/:
 *  parameters:
 *    - in: path
 *      name: bookId
 *      schema:
 *        type: string
 *  patch:
 *    parameters:
 *      - in: query
 *        name: rid
 *        schema:
 *          type: string
 *        description: recommendation id
 *      - in: body
 *        name: body
 *        schema:
 *          $ref: "#/definitions/ReviewDto"
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
route.patch('/:bookId/reviews', reviewValidations, validate, putReview);

export default route;
