import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Booksy',
      version: 'alpha-0.0.1',
      description: 'Booksy a social cataloging application that allows its users to find books and gives personalized suggestions. Users can sign up and add books to their reading lists called shelves and track their advancement.',
      servers: ['http://localhost:3000/api/v1'],
    },
    basePath: '/api/v1',
  },
  apis: ['./routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default [swaggerUI.serve, swaggerUI.setup(swaggerSpec)];
