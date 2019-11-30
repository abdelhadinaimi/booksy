import * as booksRepo from '../repositories/googleBooks.repository';
import { Request, Response } from 'express';
import { FindBookDto } from '../interfaces/book/dto/find-book.dto';

export const searchBooks = async (req: Request, res: Response) => {
  const params: FindBookDto = req.query;
  if (!params.q) {
    return res.status(400).json();
  }
  const result = await booksRepo.findBook(params);

  if (result.errors) {
    return res.status(400).json({ errors: result.errors });
  }
  return res.json(result);
};

export const getBook = async (req: Request, res: Response) => {
  const foundBook = await booksRepo.findBookById(req.params.id);
  if (!foundBook) {
    return res.status(404).send();
  }
};
