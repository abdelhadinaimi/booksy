import { Schema, Model, model } from 'mongoose';
import bookModel from '../models/book.model';
import { IBookshelf } from 'interfaces/bookshelf/bookshelve.interface';

const BookshelfSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    books: [{
      book: {
        type: Schema.Types.ObjectId,
        ref: bookModel.name,
      },
      numberOfReadPages: Number,
    }],
  },
  { timestamps: true },
);

export const Bookshelf : Model<IBookshelf> = model<IBookshelf>('Bookshelf', BookshelfSchema);

