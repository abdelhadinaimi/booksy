import { Schema } from 'mongoose';
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
    genres: [String],
  },
  { timestamps: true },
);

export default { name: 'User', schema: UserSchema };

// To avoid circular dependency
import bookshelfModel from './bookshelf.model';
UserSchema.add({ bookshelves: [bookshelfModel.schema]});
