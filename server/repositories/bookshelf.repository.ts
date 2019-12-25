import { IBookshelf } from '../interfaces/bookshelf/bookshelve.interface';
import { Result } from '../interfaces/result.interface';
import { OpBookBookshelfDto } from '../interfaces/bookshelf/dto/op-book-bookshelf.dto';
import { OpBookshelfDto } from '../interfaces/bookshelf/dto/op-bookshelf.dto';
import { Bookshelf } from '../models/bookshelf.model';




export const getUserBookshelfs = async (userId: string): Promise<Result<IBookshelf[]>> => {
  return { data: [], errors: [] };
};

export const getBookshelfById = async (getBookshelfDto: OpBookshelfDto): Promise<Result<IBookshelf>> => {
  const result: Result<IBookshelf> = { data: null, errors: null };
  try {
    const foundBookshelf: IBookshelf = await Bookshelf.findOne({ _id : getBookshelfDto.bookshelfId });
    if (foundBookshelf) {
      result.data = foundBookshelf;
    } else {
      result.data = null;
    }
  } catch (error) {
    result.errors = error.errors;
  }
  return result;
};


/**
 * creates a bookshelf and returns its id
 */
export const createBookshelf = async (opBookshelfDto: OpBookshelfDto): Promise<Result<string>> => {
  const result = { data: null, errors: null };
  try {
    const createdBookshelf = await new Bookshelf(opBookshelfDto).save();
    result.data = createdBookshelf._id;
  } catch (error) {
    result.errors = error;
  }
  return result;
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
