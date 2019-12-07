import { Bookshelf } from '../interfaces/bookshelf/bookshelve.interface';
import { Result } from '../interfaces/result.interface';
import { OpBookBookshelfDto } from '../interfaces/bookshelf/dto/op-book-bookshelf.dto';
import { OpBookshelfDto } from '../interfaces/bookshelf/dto/op-bookshelf.dto';

export const getUserBookshelfs = async (userId: string): Promise<Result<Bookshelf[]>> => {
  return { data: [], errors: [] };
};

export const getBookshelfById = async (getBookshelfDto: OpBookshelfDto): Promise<Result<Bookshelf>> => {
  return { data: null, errors: [] };
};

/**
 * creates a bookshelf and returns its id
 */
export const createBookshelf = async (opBookshelfDto: OpBookshelfDto): Promise<Result<string>> => {
  return { data: 'id of the bookshelf', errors: [] };
};

export const updateBookshelf = async (opBookshelfDto: OpBookshelfDto): Promise<Result<boolean>> => {
  return { data: false, errors: [] };
};

export const deleteBookshelf = async (opBookshelfDto: OpBookshelfDto): Promise<Result<boolean>> => {
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
