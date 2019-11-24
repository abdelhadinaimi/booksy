import * as booksRepo from '../repositories/googleBooks.repository';
import { Request, Response } from 'express';

export const searchBooks = async (req: Request, res: Response) => {
  res.json(await booksRepo.findBook(req.query));
};

export const getBook = async (req: Request, res: Response) => {
  
};