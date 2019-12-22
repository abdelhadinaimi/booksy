import { Request, Response } from 'express';
import { AddReviewDto } from '../interfaces/review/dto/add-review.dto';
import * as reviewRepo from '../repositories/reviews.repository';
import { UpdateReviewDto } from '../interfaces/review/dto/update-review.dto';

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
  return res.json({ success: result.data });
};
