import { Schema } from 'mongoose';
const UserSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    familyName: {
      type: String,
      maxlength: 50,
    },
    givenName: {
      type: String,
      maxlength: 50,
    },
    picture: String,
    email: {
      type: String,
      maxlength: 256,
    },
    genres: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export default { name: 'User', schema: UserSchema };

// To avoid circular dependency
import bookshelfModel from './bookshelf.model';
UserSchema.add({ bookshelves: [bookshelfModel.schema] });
