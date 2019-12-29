import { Schema } from 'mongoose';
import reviewModel from './review.model';
import { Volume } from '../interfaces/book/book.interface';
interface VolumeDocument extends Volume {
  updateRating: () => void;
}
export const BookSchema = new Schema<VolumeDocument>(
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

BookSchema.post('updateOne', async function() {
  (await this.model.findOne({ id: this.getQuery().id })).updateRating();
});
// tslint:disable-next-line: only-arrow-functions
BookSchema.methods.updateRating = function() {
  if (this.reviews.length !== 0) {
    const sum = this.reviews.reduce((a, b) => a + b.rating, 0);
    this.rating = sum / this.reviews.length;
  } else {
    this.rating =  0;
  }
  this.save();
};

export default { name: 'Book', schema: BookSchema };
