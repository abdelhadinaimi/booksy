import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Booksy',
      version: 'alpha-0.0.1',
      description: 'Booksy a social cataloging application that allows its users to find books and gives personalized suggestions. Users can sign up and add books to their reading lists called shelves and track their advancement.',
      servers: ['/api/v1'],
    },
    tags: [{
      name: 'user',
      description: 'Operations about user',
    }, {
      name: 'bookshelf',
      description: 'Operations about bookshelves',
    }, {
      name: 'book',
      description: 'Operations about books',
    }],
    definitions: {
      User: {
        type: 'object',
        properties: {
          firstname: {
            type: 'string',
          },
          lastname: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
      UserLogging: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
    },
    basePath: '/api/v1',
  },
  apis: ['./routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default [swaggerUI.serve, swaggerUI.setup(swaggerSpec)];
