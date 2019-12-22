import { Schema } from 'mongoose';
import bookModel from '../models/book.model';

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

export default { name: 'Bookshelf', schema: BookshelfSchema };
