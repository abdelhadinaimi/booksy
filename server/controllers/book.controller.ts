import * as booksRepo from '../repositories/googleBooks.repository';
import * as recombeeRepo from '../repositories/recombee.repository';
import { Request, Response } from 'express';
import { FindBookDto } from '../interfaces/book/dto/find-book.dto';
import Logger from '../config/logger.config';

const fillRecommendationDb = process.env.FILL_DB || false;

export const searchBooks = async (req: Request, res: Response) => {
  const params: FindBookDto = req.query;
  if (!params.q) {
    return res.status(400).json();
  }
  const result = await booksRepo.findBook(params);

  if (result.errors) {
    return res.status(400).json({ errors: result.errors });
  }

  if (fillRecommendationDb) {
    recombeeRepo.sendInBulk(result.data.items)
      .catch(error => {
        // tslint:disable-next-line: no-console
        console.log(error);
      });
  }

  return res.json(result.data);
};

export const getBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { rid } = req.query; // recommendation Id
  const userId = '507f191e810c19729de860ea';
  const result = { reviews: [], rating: 0, volume: { id: '', volumeInfo: {} }, recommendations: {} };
  if (!bookId) {
    return res.status(400).json();
  }
  const bookResult = await booksRepo.findBookById(bookId);
  if (bookResult.errors) {
    return res.status(400).json({ errors: bookResult.errors });
  }
  if (!bookResult.data._id) {
    Promise.all([
      recombeeRepo.sendBook(bookResult.data),
      booksRepo.saveBook(bookResult.data),
    ])
      .catch(error => {
        // tslint:disable-next-line: no-console
        console.log(error);
      });
  }

  result.volume.id = bookResult.data.id;
  result.volume.volumeInfo = bookResult.data.volumeInfo;
  result.reviews = bookResult.data.reviews;
  result.rating = bookResult.data.rating || 0;

  const recommendedBooksResult = await recombeeRepo.getRecommendBooksFromBook(bookId, userId, 5);
  if (recommendedBooksResult.errors) {
    return res.status(400).json({ errors: recommendedBooksResult.errors });
  }

  Promise.all([
    recombeeRepo.sendViewInteraction({ userId, bookId, recommId: rid }),
  ])
    .catch(error => {
      // tslint:disable-next-line: no-console
      console.log(error);
    });
  result.recommendations = recommendedBooksResult.data;
  return res.json(result); // TODO add rating, reviews
};

export const getRecommendBooksToUser = async (req: Request, res: Response) => {

};
