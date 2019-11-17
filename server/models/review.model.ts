import { Schema } from 'mongoose';
import userModel from './user.model';
import Logger from '../config/logger.config';

const ReviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    reviewText: {
      type: String,
      maxlength: 1000,
    },
    writer: {
      type: Schema.Types.ObjectId,
      ref: userModel.name,
      required: true,
    },
  },
  { timestamps: true },
  );
export default { name: 'Review', schema: ReviewSchema };
