import { AddReviewDto } from '../interfaces/review/dto/add-review.dto';
import { Result } from '../interfaces/result.interface';
import { model } from 'mongoose';
import { findUserById } from './users.repository';
import { Review } from '../interfaces/review/review.interface';
import { UpdateReviewDto } from '../interfaces/review/dto/update-review.dto';

const Book = model('Book');

export const addReview = async (addReviewDto: AddReviewDto): Promise<Result<boolean>> => {
  const result: Result<boolean> = { data: false, errors: null };
  // check if user has already posted a review
  const foundBook = await Book.findOne({
    'id': addReviewDto.bookId,
    'reviews.writer': addReviewDto.userId,
  });
  if (foundBook) {
    const updateResult = await Book.updateOne(
      {
        'id': addReviewDto.bookId,
        'reviews.writer': addReviewDto.userId,
      },
      {
        $set: {
          'reviews.$.rating': addReviewDto.rating,
          'reviews.$.reviewText': addReviewDto.reviewText,
        },
      });
    result.data = updateResult.nModified === 1;
    return result;
  }
  // if not, create a new review
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
