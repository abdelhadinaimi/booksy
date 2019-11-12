import { Schema } from 'mongoose';
import bookshelfModel from './bookshelf.model';

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      maxlength: 20,
    },
    lastname: {
      type: String,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: true,
      maxlength: 256,
      required: true,
    },
    bookshelves: [bookshelfModel.schema],
    genres: [String],
  },
  { timestamps: true },
);

export default { name: 'User', schema: UserSchema };
