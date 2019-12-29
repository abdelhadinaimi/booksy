import { IBookshelf } from '../interfaces/bookshelf/bookshelve.interface';
import { Result } from '../interfaces/result.interface';
import { OpBookBookshelfDto } from '../interfaces/bookshelf/dto/op-book-bookshelf.dto';
import { OpBookshelfDto } from '../interfaces/bookshelf/dto/op-bookshelf.dto';
import { Bookshelf } from '../models/bookshelf.model';
import { BookSchema } from '../models/book.model';
import { findUserById } from './users.repository';
import { findBookById } from './googleBooks.repository';
import { User } from '../models/user.model';
import { model } from 'mongoose';
import { books } from 'googleapis/build/src/apis/books';
import { ShelvedBookModel } from '../models/shelvedBook.model';

const bookModel = model('Book');

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
    const foundBookshelf: IBookshelf = await Bookshelf.findOne({ _id: getBookshelfDto.bookshelfId }).populate({ path: 'books', populate: {path: 'book'} });
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
 * a unique name
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
/**
 * check if the name is unique
 */
export const updateBookshelfName = async (opBookshelfDto: OpBookshelfDto): Promise<Result<boolean>> => {

  const result: Result<boolean> = { data: false, errors: null };
  const newName = opBookshelfDto.name;
  const bookshelfId = opBookshelfDto.bookshelfId;
  try {
    const updatedBookshelf = await Bookshelf.updateOne({ _id: bookshelfId }, {
      name: newName,
    });
    result.data = updatedBookshelf.nModified === 1;
  } catch (err) {
    result.errors = err;
  }
  return result;
};

export const deleteBookshelf = async (opBookshelfDto: OpBookshelfDto): Promise<Result<boolean>> => {
  const result = { data: null, errors: null };
  try {
    const foundUser = (await findUserById(opBookshelfDto.userId)).data;
    foundUser.deleteOneBookshelf(opBookshelfDto.bookshelfId);
    const deletedBookshelf = await Bookshelf.deleteOne({ _id: opBookshelfDto.bookshelfId });
    result.data = deletedBookshelf.n === 1;
  } catch (error) {
    result.errors = error;
  }
  return result;
};

export const addBookToBookshelf = async (opBookBookshelfDto: OpBookBookshelfDto): Promise<Result<boolean>> => {
  const result: Result<boolean> = { data: false, errors: null };
  const bookId = opBookBookshelfDto.bookId;
  const bookshelfId = opBookBookshelfDto.bookshelfId;
  try {
    const foundbook = await findBookById(bookId);
    if (!foundbook.data) {
      return { data: false, errors: ['book not found'] };
    }

    const user = (await findUserById(opBookBookshelfDto.userId)).data;
    if (!user) {
      return { data: false, errors: ['user not found'] };
    }

    const foundBookshelf = user.bookshelves.find(b => b._id.toString() === bookshelfId);
    if (!foundBookshelf) {
      return { data: false, errors: ['bookShelf not found'] };
    }
    const myBook = await new ShelvedBookModel({ book: foundbook.data._id, numberOfReadPages: 0 }).save();
    const updatedbook = await foundBookshelf.updateOne({ $push: { books: myBook._id } });

    result.data = updatedbook.nModified === 1;

  } catch (err) {
    result.errors = err;
  }
  return result;

};
// Remove from Shelvedbook and bookshelf array
export const removeBookFromBookshelf = async (opBookBookshelfDto: OpBookBookshelfDto): Promise<Result<boolean>> => {
  return { data: false, errors: [] };
};
// update the shelvedbook
export const updateBookReading = async (opBookBookshelfDto: OpBookBookshelfDto): Promise<Result<boolean>> => {
  return { data: false, errors: [] };
};
