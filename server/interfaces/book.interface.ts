import { Review } from './review.interface';

export interface Book {
  readonly id: string;
  readonly title: string;
  readonly authors: string[];
  readonly thumbnail: string;
  readonly rating: number;
  readonly reviews: Review[];
  readonly created_at: string;
  readonly updated_at: string;
}
