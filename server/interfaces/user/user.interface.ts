import { IBookshelf } from '../bookshelf/bookshelve.interface';
import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly userId: string;
  readonly familyName?: string;
  readonly givenName?: string;
  readonly picture?: string;
  readonly email: string;
  readonly genres?: string[];
  readonly bookshelves?: IBookshelf[];
  readonly deleteOneBookshelf: (id: string) => void;
}
