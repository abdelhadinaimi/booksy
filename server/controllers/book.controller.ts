import * as booksRepo from '../repositories/googleBooks.repository';
import * as recombeeRepo from '../repositories/recombee.repository';
import { Request, Response } from 'express';
import { FindBookDto } from '../interfaces/book/dto/find-book.dto';
import Logger from '../config/logger.config';

export const searchBooks = async (req: Request, res: Response) => {
  const params: FindBookDto = req.query;
  if (!params.q) {
    return res.status(400).json();
  }
  const result = await booksRepo.findBook(params);

  if (result.errors) {
    return res.status(400).json({ errors: result.errors });
  }
  return res.json(result.data);
};

export const getBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { rid } = req.query; // recommendation Id
  const userId = '507f191e810c19729de860ea';
  if (!bookId) {
    return res.status(400).json();
  }
  const bookResult = await booksRepo.findBookById(bookId);
  if (bookResult.errors) {
    return res.status(400).json({ errors: bookResult.errors });
  }

  const recommendedBooksResult = await recombeeRepo.getRecommendBooksFromBook(bookId, userId, 5);
  if (recommendedBooksResult.errors) {
    return res.status(400).json({ errors: recommendedBooksResult.errors });
  }

  Promise.all([recombeeRepo.sendBook(bookResult.data), recombeeRepo.sendViewInteraction(userId, bookId, rid)])
    .catch(error => {
      // tslint:disable-next-line: no-console
      console.log(error);
    });
  const result = { volume: bookResult.data, recommendations: recommendedBooksResult.data, rating: 1, reviews: [] };
  return res.json(result); // TODO add rating, reviews
};

export const getRecommendBooksToUser = async (req: Request, res: Response) => {

};
