import { Bookshelf } from '../bookshelf/bookshelves.interface';

export interface User {
  readonly _id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly genres: string[];
  readonly bookshelves: Bookshelf[];
  readonly created_at: string;
  readonly updated_at: string;
}
