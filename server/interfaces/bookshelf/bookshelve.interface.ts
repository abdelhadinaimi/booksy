import { Volume } from '../book/book.interface';
import { Document } from 'mongoose';

export interface IBookshelf extends Document {
  readonly name: string;
  readonly books: ShelvedBook[];
  readonly created_at: string;
  readonly updated_at: string;
}

export interface ShelvedBook {
  readonly book: Volume;
  readonly numberOfReadPages: number;
}
