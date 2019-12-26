import { Schema, Model, model } from 'mongoose';
import { IUser } from '../interfaces/user/user.interface';

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      maxlength: 200,
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
    bookshelves: [{
      type: Schema.Types.ObjectId,
        ref: 'Bookshelf',
    }],
  },
  { timestamps: true },
);

export const User: Model<IUser> = model<IUser>('User', UserSchema);
