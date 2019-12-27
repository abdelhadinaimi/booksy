import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'Booksy',
      version: 'alpha-0.0.1',
      description: 'Booksy a social cataloging application that allows its users to find books and gives personalized suggestions. Users can sign up and add books to their reading lists called shelves and track their advancement.',
    },
    servers: [
      { url: '/api/v1' },
    ],
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
      Book: {
        type: 'object',
        properties: {
          volume: {
            type: 'object',
            $ref: '#/definitions/Volume',
          },
          rating: {
            type: 'number',
            minimum: 0,
            maximum: 5,
          },
          recommendations: {
            type: 'object',
            $ref: '#/definitions/Recommendations',
          },
          reviews: {
            type: 'array',
            items: {
              $ref: '#/definitions/Review',
            },
          },
        },
      },
      Volume: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          volumeInfo: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
              },
              subtitle: {
                type: 'string',
              },
              publisher: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              pageCount: {
                type: 'number',
              },
              authors: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              categories: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              thumbnail: {
                type: 'string',
              },
              imageLinks: {
                type: 'object',
                properties: {
                  thumbnail: {
                    type: 'string',
                  },
                },
              },
              publishedDate: {
                type: 'string',
              },
            },
          },
        },
      },
      Recommendations: { // TODO complete Volume definition
        type: 'object',
        properties: {
          rid: {
            type: 'string',
          },
          volumes: {
            type: 'array',
            items: {
              $ref: '#/definitions/Volume',
            },
          },
        },
      },
      Bookshelf: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          books: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                volume: {
                  $ref: '#/definitions/Volume',
                },
                numberOfReadPages: {
                  type: 'number',
                },
              },
            },
          },
        },
      },
      Review: {
        type: 'object',
        properties: {
          rating: {
            type: 'number',
            minimum: 0,
            maximum: 5,
          },
          reviewText: {
            type: 'string',
            maxLength: 1000,
          },
          writer: {
            $ref: '#/definitions/User',
          },
        },
      },
      ReviewDto: {
        type: 'object',
        properties: {
          rating: {
            type: 'number',
            minimum: 0,
            maximum: 5,
          },
          reviewText: {
            type: 'string',
            maxLength: 1000,
          },
        },
      },
    },
    basePath: '/api/v1',
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  apis: ['./routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default [swaggerUI.serve, swaggerUI.setup(swaggerSpec)];
