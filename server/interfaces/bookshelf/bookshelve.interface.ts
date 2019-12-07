import { Book, Volume } from '../book/book.interface';

export interface Bookshelf {
  readonly _id: string;
  readonly name: string;
  readonly books: ShelvedBook[];
  readonly created_at: string;
  readonly updated_at: string;
}

export interface ShelvedBook {
  readonly book: Volume;
  readonly numberOfReadPages: number;
}
