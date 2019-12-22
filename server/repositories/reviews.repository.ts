import { AddReviewDto } from '../interfaces/review/dto/add-review.dto';
import { Result } from '../interfaces/result.interface';
import { model } from 'mongoose';
import { errors } from '../common/errors.common';
import { findUserById } from './users.repository';
import { Review } from '../interfaces/review/review.interface';

const Book = model('Book');

export const addReview = async (addReviewDto: AddReviewDto): Promise<Result<boolean>> => {
  const result: Result<boolean> = { data: false, errors: null };

  const foundUserResult = await findUserById(addReviewDto.userId);
  if (foundUserResult.errors) {
    result.errors = foundUserResult.errors;
    return result;
  }
  const review: Review = {
    rating: addReviewDto.rating,
    reviewText: addReviewDto.reviewText,
    writer: addReviewDto.userId,
  };
  try {
    const updateResult = await Book.updateOne({ id: addReviewDto.bookId }, { $push: { reviews: review } });
    result.data = updateResult.nModified === 1;
  } catch (error) {
    result.errors = error;
  }
  return result;
};
