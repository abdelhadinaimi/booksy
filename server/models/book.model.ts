import { Schema } from 'mongoose';
import reviewModel from './review.model';
import { Volume } from '../interfaces/book/book.interface';

export const BookSchema = new Schema<Volume>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    volumeInfo: {
      title: String,
      subtitle: String,
      publisher: String,
      description: String,
      pageCount: Number,
      authors: [String],
      categories: [String],
      thumbnail: String,
      publishedDate: String,
    },
    reviews: [reviewModel.schema], // TODO make relational
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true },
);

export default { name: 'Book', schema: BookSchema };
