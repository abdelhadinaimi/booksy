import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import Logger from './logger.config';
import { RequestHandler } from 'express';

const authConfig = {
  domain: 'dev-ohvjdegt.eu.auth0.com',
  audience: 'https://booksy-api.herokuapp.com/',
};

const jwtHandler = jwt({
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

const jwtErrorHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status).send({ message: err.message });
    Logger.error(err);
    return;
  }
  next();
};

const jwtIgnore = (err, req, res, next) => {
  next();
};

export const cookieMiddleware: RequestHandler = (req, res, next) => {
  const cookie = req.cookies.sess;
  if (!cookie) {
    const radnNum = Math.random().toString();
    const cookieID = Math.random().toString().substring(2, radnNum.length);
    res.cookie('sess', cookieID, { maxAge: 604800000, httpOnly: true });
  }
  next();
};

export const checkJwtOrIgnore = [jwtHandler, jwtIgnore];
export const checkJwt = [jwtHandler, jwtErrorHandler];
