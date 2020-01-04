import { IBookshelf } from '../interfaces/bookshelf/bookshelve.interface';
import { Result } from '../interfaces/result.interface';
import { OpBookBookshelfDto } from '../interfaces/bookshelf/dto/op-book-bookshelf.dto';
import { OpBookshelfDto } from '../interfaces/bookshelf/dto/op-bookshelf.dto';
import { Bookshelf } from '../models/bookshelf.model';
import { findUserById } from './users.repository';
import { findBookById } from './googleBooks.repository';
import { model } from 'mongoose';
import { ShelvedBookModel } from '../models/shelvedBook.model';
import { defaultBookShelves } from '../common/helper.common';

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
    const foundBookshelf: IBookshelf = await Bookshelf.findOne({ _id: getBookshelfDto.bookshelfId }).populate({ path: 'books', populate: { path: 'book' } });
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
  const newName = opBookshelfDto.name;
  try {
    const user = (await findUserById(opBookshelfDto.userId)).data;
    if (!user) {
      return { data: null, errors: ['user not found'] };
    }
    const isUniqueName = await user.bookshelves.find(b => b.name === newName);
    if (isUniqueName) {

      return { data: null, errors: ['that name is not unique'] };

    } else {
      const bookshelf = await new Bookshelf({ name: opBookshelfDto.name }).save();
      const userData = (await findUserById(opBookshelfDto.userId)).data;
      userData.bookshelves.push(bookshelf._id);
      await userData.save();
      result.data = bookshelf._id;
    }
  } catch (error) {
    result.errors = error;
  }
  return result;
};
/**
 * check if the name is unique
 * the name of the bookshelf is not in default
 */
export const updateBookshelfName = async (opBookshelfDto: OpBookshelfDto): Promise<Result<boolean>> => {

  const result: Result<boolean> = { data: false, errors: null };
  const newName = opBookshelfDto.name;
  const bookshelfId = opBookshelfDto.bookshelfId;
  try {
    const user = (await findUserById(opBookshelfDto.userId)).data;
    if (!user) {
      return { data: false, errors: ['user not found'] };
    }
    const isUniqueName = await user.bookshelves.find(b => b.name === newName);
    if (isUniqueName) {

      return { data: false, errors: ['that name is not unique'] };

    } else {
      const updatedBookshelf = await Bookshelf.updateOne({ _id: bookshelfId }, {
        name: newName,
      });
      result.data = updatedBookshelf.nModified === 1;
    }
  } catch (err) {
    result.errors = err;
  }
  return result;
};

export const deleteBookshelf = async (opBookshelfDto: OpBookshelfDto): Promise<Result<boolean>> => {
  const result = { data: null, errors: null };
  try {
    const foundUser = (await findUserById(opBookshelfDto.userId)).data;
    const bookshelf = foundUser.bookshelves.find(b => b._id.toString() === opBookshelfDto.bookshelfId);
    if (defaultBookShelves.includes(bookshelf.name)) {
      return { data: false, errors: ['cannot delete default shelves'] };
    }
    foundUser.deleteOneBookshelf(opBookshelfDto.bookshelfId);
    const deletedBookshelf = await Bookshelf.deleteOne({ _id: opBookshelfDto.bookshelfId });
    result.data = deletedBookshelf.n === 1;
  } catch (error) {
    result.errors = error;
  }
  return result;
};
// check if the book is not already in the bookshelf and is not on another one

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
    const shelvedbooks = await ShelvedBookModel.find({ _id: { $in: foundBookshelf.books } });
    const bookAlreadyIn = shelvedbooks.find(sb => sb.book._id.toString() === foundbook.data._id.toString());
    if (bookAlreadyIn) {
      return { data: false, errors: ['Book already inserted'] };
    }
    const myBook = await new ShelvedBookModel({ book: foundbook.data._id, numberOfReadPages: 0, id: foundbook.data.id }).save();
    const updatedbook = await foundBookshelf.updateOne({ $push: { books: myBook._id } });

    result.data = updatedbook.nModified === 1;

  } catch (err) {
    result.errors = err;
  }
  return result;

};
// Remove from Shelvedbook and bookshelf array
export const removeBookFromBookshelf = async (opBookBookshelfDto: OpBookBookshelfDto): Promise<Result<boolean>> => {
  const bookId = opBookBookshelfDto.bookId;
  const bookshelfId = opBookBookshelfDto.bookshelfId;
  try {
    const foundbook = await findBookById(bookId);
    const user = (await findUserById(opBookBookshelfDto.userId)).data;
    const foundBookshelf = user.bookshelves.find(b => b._id.toString() === bookshelfId);
    const shelvedbooks = await ShelvedBookModel.find({ _id: { $in: foundBookshelf.books } });
    const foundshelvedbook = shelvedbooks.find(sb => sb.book._id.toString() === foundbook.data._id.toString());
    await ShelvedBookModel.deleteOne({ _id: foundshelvedbook._id });
    foundBookshelf.books = foundBookshelf.books.filter(b => b._id.toString() !== foundshelvedbook._id.toString());
    foundBookshelf.save();
    return { data: true, errors: null };
  } catch (err) {
    return { data: false, errors: [err] };
  }
};
// update the shelvedbook
export const updateBookReading = async (opBookBookshelfDto: OpBookBookshelfDto): Promise<Result<boolean>> => {
  const numberOfReadPages = opBookBookshelfDto.numberOfReadPages;
  const bookId = opBookBookshelfDto.bookId;
  const bookshelfId = opBookBookshelfDto.bookshelfId;
  try {
    const foundbook = await findBookById(bookId);
    const user = (await findUserById(opBookBookshelfDto.userId)).data;
    const foundBookshelf = user.bookshelves.find(b => b._id.toString() === bookshelfId);
    const shelvedbooks = await ShelvedBookModel.find({ _id: { $in: foundBookshelf.books } });
    const foundshelvedbook = shelvedbooks.find(sb => sb.book._id.toString() === foundbook.data._id.toString());
    await ShelvedBookModel.updateOne({ _id: foundshelvedbook._id }, { numberOfReadPages: numberOfReadPages });
    return { data: true, errors: null };
  }catch(err){
    return { data: false, errors: [err] };
  }
};
