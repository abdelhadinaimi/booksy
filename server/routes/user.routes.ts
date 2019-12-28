import { Router } from 'express';
import { patchUpdateUserGenres, postLoginUser } from '../controllers/user.controller';
import jwt = require('express-jwt');
import { checkJwt } from '../config/auth.config';
const route = Router();

/**
 * @swagger
 * /user/login:
 *  post:
 *    tags:
 *    - "user"
 *    summary: logs the user into the system
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      required: true
 *      schema:
 *        $ref: '#/definitions/UserLogging'
 *    responses:
 *      '200':
 *        description: Success!
 *    security:
 *      - bearerAuth: []
 */
route.post('/login', checkJwt, postLoginUser);

/**
 * @swagger
 * /user/logout:
 *  get:
 *   tags:
 *    - "user"
 *   summary: "Logs out current logged in user session"
 *   description: ""
 *   operationId: "logoutUser"
 *   parameters: []
 *   responses:
 *    default:
 *      description: "successful operation"
 *      security:
 *        - bearerAuth: []
 */
route.get('/logout', (req, res) => {
  res.send('logout');
});

/**
 * @swagger
 * /user/{userId}:
 *  patch:
 *    tags:
 *    - "user"
 *    summary: "Updates user info"
 *    description: "This can only be done by the logged in user."
 *    operationId: "updateUser"
 *    parameters:
 *      - in: "path"
 *        name: userId
 *        description: "ID of the user that needs to be updated"
 *        required: true
 *        type: "string"
 *      - in: "body"
 *        name: "body"
 *        description: "Updated user object"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/User"
 *    responses:
 *      400:
 *        description: "Invalid user supplied"
 *      404:
 *        description: "User not found"
 */
route.patch('/:userId', patchUpdateUserGenres);

export default route;
