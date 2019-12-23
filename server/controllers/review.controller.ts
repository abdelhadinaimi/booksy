import { Request, Response } from 'express';
import { AddReviewDto } from '../interfaces/review/dto/add-review.dto';
import * as reviewRepo from '../repositories/reviews.repository';
import { UpdateReviewDto } from '../interfaces/review/dto/update-review.dto';
import { sendRatingInteraction, UserInteractionDto } from '../repositories/recombee.repository';

export const putReview = async (req: Request, res: Response) => {
  const addReviewDto: AddReviewDto = {
    bookId: req.params.bookId,
    userId: '5df3d7070d77d5621f584083',
    rating: req.body.rating,
    reviewText: req.body.reviewText,
  };

  const result = await reviewRepo.addReview(addReviewDto);
  if (result.errors) {
    return res.status(400).json({ errors: result.errors });
  }

  const rating = Number.parseInt(addReviewDto.rating, 10);
  const ratingInteraction: UserInteractionDto = {
    bookId: addReviewDto.bookId,
    userId: addReviewDto.userId,
    rating,
    recommId: req.query.rid,
  };
  sendRatingInteraction(ratingInteraction)
    .catch(error => {
      // tslint:disable-next-line: no-console
      console.log(error);
    });
  return res.json({ success: result.data });
};
