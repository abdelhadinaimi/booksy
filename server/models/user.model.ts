import { Schema, Model, model } from 'mongoose';
import { IUser } from '../interfaces/user/user.interface';

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
    bookshelvs: [{
      type: Schema.Types.ObjectId,
        ref: 'Bookshelf',
    }]
  },
  { timestamps: true },
);

export const User: Model<IUser> = model<IUser>('User', UserSchema);

