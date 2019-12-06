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
/**
 * This is used to represent our books in our databases, diffrenet from the google books one
 */
export type Book = BookCore & BookMongo;

/**
 * Individual volume, same as the google books api interface
 */
export interface Volume {
  id?: string;
  volumeInfo?: {
    imageLinks?: {
      thumbnail?: string;
    },
  } & Partial<BookCore>;
}
/**
 * Used for performing book search
 */
export interface Volumes {
  totalItems?: number;
  items?: Volume[];
}
