export interface AddReviewDto {
  userId: string;
  bookId: string;
  rating: string;
  reviewText?: string;
}
