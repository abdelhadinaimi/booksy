import { RequestHandler } from 'express';

export const getAll: RequestHandler = (req, res) => {
  res.send('All the bookshelves');
};
