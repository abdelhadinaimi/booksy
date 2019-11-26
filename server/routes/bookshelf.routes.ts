import { Router } from 'express';
import { getAll } from '../controllers/bookshelf.controller';

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
 *  post:
 *    tags:
 *    - "bookshelf"
 *    parameters:
 *      - in: body
 *        name: body
 *        schema:
 *          $ref: "#/definitions/Bookshelf"
 *    summary: creates a bookshelf
 *    description: creates a bookshelf
 *    responses:
 *      '200':
 *        description: Success!
 *  put:
 *    tags:
 *    - "bookshelf"
 *    parameters:
 *      - in: body
 *        name: body
 *        schema:
 *          $ref: "#/definitions/Bookshelf"
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
route.get('/:bookshelfId', getAll);

route.put('/:bookshelfId', getAll);

export default route;
