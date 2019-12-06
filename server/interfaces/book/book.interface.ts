import { Review } from '../review/review.interface';

interface BookMongo {
  id: string;
  rating: number;
  reviews: Review[];
  created_at: string;
  updated_at: string;
}

export interface BookCore {
  title: string;
  subtitle: string;
  publisher: string;
  description: string;
  pageCount: number;
  authors: string[];
  categories: string[];
  thumbnail: string;
  publishedDate: string;
}

export type Book = BookCore & BookMongo;
export interface Volume {
  id?: string;
  volumeInfo?: {
    imageLinks?: {
      thumbnail?: string;
    },
  } & Partial<BookCore>;
}
