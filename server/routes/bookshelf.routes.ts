import { Router } from 'express';
import { getAll, postBookshelf, putBookshelf, getBookshelf, deleteBookshelf } from '../controllers/bookshelf.controller';

const route = Router();

/**
 * @swagger
 * /bookshelves/:
 *  get:
 *    tags:
 *    - "bookshelf"
 *    summary: gets all the bookshelves of the logged user
 *    description: gets all the bookshelves of the logged user
 *    responses:
 *      '200':
 *        description: Success!
 */
route.get('/', getAll);

/**
 * @swagger
 * /bookshelves/{bookshelfId}:
 *  parameters:
 *    - in: path
 *      name: bookshelfId
 *      schema:
 *        type: string
 *      description: ID of a bookshelf
 *  get:
 *    tags:
 *    - "bookshelf"
 *    summary: gets all the books in the bookshelf of the connected user
 *    description: gets all the books in the bookshelf of the connected user
 *    responses:
 *      '200':
 *        description: Success!
 *        schema:
 *          $ref: "#/definitions/Bookshelf"
 *  put:
 *    tags:
 *    - "bookshelf"
 *    parameters:
 *      - in: body
 *        name: body
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *    summary: updates a bookshelf
 *    description: updates a bookshelf
 *    responses:
 *      '200':
 *        description: Success!
 *  delete:
 *    tags:
 *    - "bookshelf"
 *    summary: deletes the bookshelf
 *    description: deletes the bookshelf
 *    responses:
 *      '200':
 *        description: Success!
 */
route.get('/:bookshelfId', getBookshelf);

route.put('/:bookshelfId', putBookshelf);

route.delete('/:bookshelfId', deleteBookshelf);

/**
 * @swagger
 * /bookshelves/:
 *  post:
 *    tags:
 *    - "bookshelf"
 *    parameters:
 *      - in: body
 *        name: body
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *    summary: creates a bookshelf
 *    description: creates a bookshelf
 *    responses:
 *      '200':
 *        description: Success!
 */
route.post('/', postBookshelf);

/**
 * @swagger
 * /bookshelves/{bookshelfId}/addBook/{bookId}:
 *  parameters:
 *    - in: path
 *      name: bookshelfId
 *      schema:
 *        type: string
 *      description: ID of a bookshelf
 *    - in: path
 *      name: bookId
 *      schema:
 *        type: string
 *  post:
 *    tags:
 *    - "bookshelf"
 *    summary: add a book to a bookshelf
 *    description: creates a bookshelf
 *    responses:
 *      '200':
 *        description: Success!
 */
route.post('/', postBookshelf);

export default route;
