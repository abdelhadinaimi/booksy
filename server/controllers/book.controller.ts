import * as booksRepo from '../repositories/googleBooks.repository';
import * as recombeeRepo from '../repositories/recombee.repository';
import { Request, Response } from 'express';
import { FindBookDto } from '../interfaces/book/dto/find-book.dto';
import Logger from '../config/logger.config';
import { prepareAuth0UserId } from '../common/helper.common';

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
  const { rid, short } = req.query; // recommendation Id
  const userId = prepareAuth0UserId((req as any).user?.sub) || req.cookies.sess || 'noId';
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
    ])
      .catch(error => {
        // tslint:disable-next-line: no-console
        console.log(error);
      });
  }

  result.volume.id = bookResult.data.id;
  result.volume.volumeInfo = bookResult.data.volumeInfo;
  result.rating = bookResult.data.rating || 0;
  if (short) {
    return res.json(result);
  }
  result.reviews = bookResult.data.reviews || [];
  const recommendedBooksResult = await recombeeRepo.getRecommendBooksFromBook(bookId, userId, 10);
  if (recommendedBooksResult.errors) {
    return res.status(400).json({ errors: recommendedBooksResult.errors });
  }
  result.recommendations = recommendedBooksResult.data;
  Promise.all([
    recombeeRepo.sendViewInteraction({ userId, bookId, recommId: rid }),
  ])
    .catch(error => {
      // tslint:disable-next-line: no-console
      console.log(error);
    });

  return res.json(result);
};

export const getRecommendBooksToUser = async (req: Request, res: Response) => {
  const userId = prepareAuth0UserId((req as any).user?.sub) || req.cookies.sess || 'noId';
  const category = (req.query?.category || '').toLowerCase();
  const result = await recombeeRepo.getRecommendBooksToUser(userId, category, 18);
  if (result.errors) {
    return res.status(400).json({ errors: result.errors });
  }
  return res.json(result);
};

export const getPopularBooks = async (req: Request, res: Response) => {
  const result = await booksRepo.getPopularBooks(6);
  if (result.errors) {
    return res.status(400).json({ errors: result.errors });
  }
  return res.json(result.data);
};
