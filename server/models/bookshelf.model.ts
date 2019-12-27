import { Schema, Model, model } from 'mongoose';
import bookModel from '../models/book.model';
import { IBookshelf } from 'interfaces/bookshelf/bookshelve.interface';
import { IUser } from '../interfaces/user/user.interface';

const BookshelfSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    books: [{

      type: Schema.Types.ObjectId,
      ref: 'ShelvedBook',
    },

    ],
  },
  { timestamps: true },
);

export const Bookshelf: Model<IBookshelf> = model<IBookshelf>('Bookshelf', BookshelfSchema);
