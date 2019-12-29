import { Volume } from '../book/book.interface';
import { Document } from 'mongoose';

export interface IBookshelf extends Document {
  readonly name: string;
  books: IShelvedBook[];
  readonly created_at: string;
  readonly updated_at: string;
}

export interface IShelvedBook extends Document {
  readonly id: string;
  readonly book: Volume;
  readonly numberOfReadPages: number;
}
