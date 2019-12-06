import { Bookshelf } from '../interfaces/bookshelf/bookshelves.interface';
import { Result } from '../interfaces/result.interface';
import { OpBookBookshelfDto } from '../interfaces/bookshelf/dto/op-book-bookshelf.dto';
import { UpdateBookshelfDto } from '../interfaces/bookshelf/dto/update-bookshelf.dto';

/**
 * creates a bookshelf and returns its id
 */
export const createBookshelf = async (name: string): Promise<Result<string>> => {
  return { data: 'id of the bookshelf', errors: [] };
};

export const updateBookshelf = async (updateBookshelfDto: UpdateBookshelfDto): Promise<Result<boolean>> => {
  return { data: false, errors: [] };
};

export const deleteBookshelf = async (id: string): Promise<Result<boolean>> => {
  return { data: false, errors: [] };
};

export const addBookToBookshelf = async (opBookBookshelfDto: OpBookBookshelfDto): Promise<Result<boolean>> => {
  return { data: false, errors: [] };
};

export const removeBookFromBookshelf = async (opBookBookshelfDto: OpBookBookshelfDto): Promise<Result<boolean>> => {
  return { data: false, errors: [] };
};

export const updateBookReading = async (opBookBookshelfDto: OpBookBookshelfDto): Promise<Result<boolean>> => {
  return { data: false, errors: [] };
};
