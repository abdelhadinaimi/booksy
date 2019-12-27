import { IBookshelf } from '../interfaces/bookshelf/bookshelve.interface';
import { Result } from '../interfaces/result.interface';
import { OpBookBookshelfDto } from '../interfaces/bookshelf/dto/op-book-bookshelf.dto';
import { OpBookshelfDto } from '../interfaces/bookshelf/dto/op-bookshelf.dto';
import { Bookshelf } from '../models/bookshelf.model';
import { findUserById } from './users.repository';
import { User } from '../models/user.model';

export const getUserBookshelfs = async (userId: string): Promise<Result<IBookshelf[]>> => {
  const result: Result<IBookshelf[]> = { data: null, errors: null };
  try {

    const user = await findUserById(userId);
    const foundBookshelves: IBookshelf[] = (await findUserById(userId)).data.bookshelves;
    result.data = foundBookshelves;

  } catch (error) {
    result.errors = error.errors;
  }
  return result;
};

export const getBookshelfById = async (getBookshelfDto: OpBookshelfDto): Promise<Result<IBookshelf>> => {
  const result: Result<IBookshelf> = { data: null, errors: null };
  try {
    const foundBookshelf: IBookshelf = await Bookshelf.findOne({ _id: getBookshelfDto.bookshelfId });
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
    const bookshelf = await new Bookshelf({ name: opBookshelfDto.name }).save();
    const userData = (await findUserById(opBookshelfDto.userId)).data;
    userData.bookshelves.push(bookshelf._id);
    await userData.save();
    result.data = bookshelf._id;
  } catch (error) {
    result.errors = error;
  }
  return result;
};

export const updateBookshelf = async (opBookshelfDto: OpBookshelfDto): Promise<Result<boolean>> => {
  return { data: null, errors: null };
};

export const deleteBookshelf = async (opBookshelfDto: OpBookshelfDto): Promise<Result<boolean>> => {
  const result = { data: null, errors: null };
  try {
    const foundUser =  (await findUserById(opBookshelfDto.userId)).data;
    foundUser.deleteOneBookshelf(opBookshelfDto.bookshelfId);
    const deletedBookshelf = await Bookshelf.deleteOne({ _id: opBookshelfDto.bookshelfId });
    result.data = deletedBookshelf.n === 1;
  } catch (error) {
    result.errors = error;
  }
  return result;
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
