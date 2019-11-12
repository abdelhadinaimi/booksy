import { Schema } from 'mongoose';
import reviewModel from './review.model';

const BookSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    authors: [String],
    thumbnail: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: reviewModel.name,
      },
    ],
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true },
);

export default { name: 'Book', schema: BookSchema };
