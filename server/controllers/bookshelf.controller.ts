import { RequestHandler } from 'express';

export const getAll: RequestHandler = (req, res) => {
  res.send('All the bookshelves');
};

export const getBookshelf: RequestHandler = (req, res) => {
  res.send('Get the bookshelves');
};

export const postBookshelf: RequestHandler = (req, res) => {
  res.send('Post bookshelf');
};

export const putBookshelf: RequestHandler = (req, res) => {
  res.send('Put bookshelf');
};

export const deleteBookshelf: RequestHandler = (req, res) => {
  res.send('Delete bookshelf');
};
