import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

const authConfig = {
  domain: 'dev-ohvjdegt.eu.auth0.com',
  audience: 'https://booksy-api.herokuapp.com/',
};

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ['RS256'],
});
