import { AddReviewDto } from '../interfaces/review/dto/add-review.dto';
import { Result } from '../interfaces/result.interface';
import { model } from 'mongoose';
import { findUserById } from './users.repository';
import { Review } from '../interfaces/review/review.interface';
import { DeleteReviewDto } from '../interfaces/review/dto/delete-review.dto';

const Book = model('Book');

export const addReview = async (addReviewDto: AddReviewDto): Promise<Result<boolean>> => {
  const result: Result<boolean> = { data: false, errors: null };
  const foundUserResult = await findUserById(addReviewDto.userId);
  if (foundUserResult.errors) {
    result.errors = foundUserResult.errors;
    return result;
  }
  // check if user has already posted a review
  const foundBook = await Book.findOne({
    'id': addReviewDto.bookId,
    'reviews.writer': foundUserResult.data._id,
  });
  if (foundBook) {
    const updateResult = await Book.updateOne(
      {
        'id': addReviewDto.bookId,
        'reviews.writer': foundUserResult.data._id,
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
  const review: Review = {
    rating: addReviewDto.rating,
    reviewText: addReviewDto.reviewText,
    writer: foundUserResult.data._id,
  };
  try {
    const updateResult = await Book.updateOne({ id: addReviewDto.bookId }, { $push: { reviews: review } });
    result.data = updateResult.nModified === 1;
  } catch (error) {
    result.errors = error;
  }
  return result;
};

export const deleteReview = async (deleteReviewDto: DeleteReviewDto): Promise<Result<boolean>> => {
  const result: Result<boolean> = { data: false, errors: null };
  const foundUserResult = await findUserById(deleteReviewDto.userId);
  if (foundUserResult.errors) {
    result.errors = foundUserResult.errors;
    return result;
  }
  try {
    const updateResult = await Book.updateOne(
      { id: deleteReviewDto.bookId },
      { $pull: { reviews: { writer: foundUserResult.data._id } } },
    );
    result.data = updateResult.nModified === 1;
  } catch (error) {
    result.errors = error;
  }

  return result;
};
