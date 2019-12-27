import { Schema, Model, model } from 'mongoose';
import { IUser } from '../interfaces/user/user.interface';

const UserSchema: Schema = new Schema(
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

UserSchema.methods.deleteOneBookshelf = function(id: string) {
  const index = this.bookshelves.indexOf(id);
  if (index !== -1) {
    this.bookshelves.splice(index, 1);
    this.save();
  }
};

export const User = model<IUser>('User', UserSchema);
