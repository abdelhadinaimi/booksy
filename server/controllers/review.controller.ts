import { Request, Response } from 'express';
import { AddReviewDto } from '../interfaces/review/dto/add-review.dto';
import * as reviewRepo from '../repositories/reviews.repository';
import { sendRatingInteraction, deleteRatingInteraction, UserInteractionDto } from '../repositories/recombee.repository';
import { prepareAuth0UserId } from '../common/helper.common';
import { DeleteReviewDto } from '../interfaces/review/dto/delete-review.dto';

export const putReview = async (req: Request, res: Response) => {
  const addReviewDto: AddReviewDto = {
    bookId: req.params.bookId,
    userId: (req as any).user.sub,
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
    userId: prepareAuth0UserId(addReviewDto.userId),
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

export const deleteReview = async (req: Request, res: Response) => {
  const deleteReviewDto: DeleteReviewDto = {
    bookId: req.params.bookId,
    userId: (req as any).user.sub,
  };
  const result = await reviewRepo.deleteReview(deleteReviewDto);
  if (result.errors) {
    return res.status(400).json({ errors: result.errors });
  }
  const ratingInteraction: UserInteractionDto = {
    bookId: deleteReviewDto.bookId,
    userId: prepareAuth0UserId(deleteReviewDto.userId),
  };
  deleteRatingInteraction(ratingInteraction)
    .catch(error => {
      // tslint:disable-next-line: no-console
      console.log(error);
    });
  return res.json({ success: result.data });
};
