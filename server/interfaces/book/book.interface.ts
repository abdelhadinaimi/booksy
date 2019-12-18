import { Review } from '../review/review.interface';

/**
 * Individual volume, same as the google books api interface
 */
export interface Volume {
  _id?: string;
  id?: string;
  rating?: number;
  reviews?: Review[];
  volumeInfo?: {
    imageLinks?: {
      thumbnail?: string;
    },
    title?: string;
    subtitle?: string;
    publisher?: string;
    description?: string;
    pageCount?: number;
    authors?: string[];
    categories?: string[];
    thumbnail?: string;
    publishedDate?: string;
  };
}
/**
 * Used for performing book search
 */
export interface Volumes {
  totalItems?: number;
  items?: Volume[];
}
