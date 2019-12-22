export interface UpdateReviewDto {
  userId: string;
  bookId: string;
  rating?: string;
  reviewText?: string;
}
