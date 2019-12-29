import { Router } from 'express';
import { getAll, postBookshelf, putBookshelf, getBookshelf, deleteBookshelf, updateBookshelf ,addBook, removeBook} from '../controllers/bookshelf.controller';
import { bookshelfValidations, validate } from '../config/validation.config';


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
 *        schema:
 *          type: array
 *          items:
 *            $ref: "#/definitions/Bookshelf"
 *    security:
 *      - bearerAuth: []
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
 *    security:
 *      - bearerAuth: []
 *  patch:
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
 *    security:
 *      - bearerAuth: []
 *  delete:
 *    tags:
 *    - "bookshelf"
 *    summary: deletes the bookshelf
 *    description: deletes the bookshelf
 *    responses:
 *      '200':
 *        description: Success!
 *    security:
 *      - bearerAuth: []
 */
route.get('/:bookshelfId', getBookshelf);

route.delete('/:bookshelfId', deleteBookshelf);

/**
 * @swagger
 * /bookshelves/{bookshelfId}/books/{bookId}:
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
 *      description: ID of a book
 *  delete:
 *    tags:
 *    - "bookshelf"
 *    summary: remove a book from bookshelf
 *    description: removes a book
 *    responses:
 *      '200':
 *        description: Success!
 *    security:
 *      - bearerAuth: []
 */
route.delete('/:bookshelfId/books/:bookId', removeBook);

route.patch('/:bookshelfId', bookshelfValidations, validate, updateBookshelf);

/**
 * @swagger
 * /bookshelves/:
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
 *    summary: creates a bookshelf
 *    description: creates a bookshelf
 *    responses:
 *      '200':
 *        description: Success!
 *    security:
 *      - bearerAuth: []
 */
route.put('/', bookshelfValidations, validate, putBookshelf);

/**
 * @swagger
 * /bookshelves/{bookshelfId}/books/:
 *  parameters:
 *    - in: path
 *      name: bookshelfId
 *      schema:
 *        type: string
 *      description: ID of a bookshelf
 *    - in: body
 *      name: body
 *      schema:
 *         type: object
 *         properties:
 *          bookId:
 *             type: string
 *  put:
 *    tags:
 *    - "bookshelf"
 *    summary: add a book to a bookshelf
 *    description: creates a bookshelf
 *    responses:
 *      '200':
 *        description: Success!
 *    security:
 *      - bearerAuth: []
 */
route.put('/:bookshelfId/books', addBook);
/**
 * @swagger
 * /bookshelves/{bookshelfId}/books/{bookId}:
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
 *    parameters:
 *      - in: body
 *        name: body
 *        schema:
 *          type: object
 *          properties:
 *            numberOfReadPages:
 *              type: number
 *    tags:
 *    - "bookshelf"
 *    summary: updates a book reading page
 *    description: updates a book reading page
 *    responses:
 *      '200':
 *        description: Success!
 *    security:
 *      - bearerAuth: []
 */
route.post('/:bookshelfId/books/:bookId', postBookshelf);
export default route;
