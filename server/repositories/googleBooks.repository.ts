import { books, auth } from 'googleapis/build/src/apis/books';
import { FindBookDto } from '../interfaces/book/dto/find-book.dto';
import { Volume, Volumes } from '../interfaces/book/book.interface';
import { Result } from '../interfaces/result.interface';
import { model } from 'mongoose';
import { parseGoogleApiVolume } from '../common/helper.common';

const Book = model('Book');

const booksClient = books({
  version: 'v1',
  auth: auth.fromAPIKey(process.env.BOOK_API_KEY),
});

export const findBook = async (query: FindBookDto): Promise<Result<Volumes>> => {
  const result: Result<Volumes> = { data: { items: [], totalItems: 0 }, errors: null };
  try {
    const requestResult = await booksClient.volumes.list(query);
    result.data = requestResult.data;
    result.data.items = result.data.items.map(parseGoogleApiVolume);
  } catch (error) {
    result.errors = error.errors;
  }
  return result;
};

export const findBookById = async (id: string): Promise<Result<Volume>> => {
  const result: Result<Volume> = { data: null, errors: null };
  try {
    const foundBook: Volume = await (Book.findOne({ id }).populate('reviews.writer', 'name'));
    if (foundBook) {
      result.data = foundBook;
    } else {
      const requestResult = await booksClient.volumes.get({ volumeId: id });
      result.data = parseGoogleApiVolume(requestResult.data);
      await saveBook(result.data);
    }
  } catch (error) {
    result.errors = error.errors;
  }
  return result;
};

export const saveBook = async (book: Volume): Promise<Result<boolean>> => {
  const result = { data: true, errors: null };

  const newBookData: Volume = {
    id: book.id,
    volumeInfo: {
      ...book.volumeInfo,
    },
  };
  try {
    const createdBook = await new Book(newBookData).save();
    result.data = !!createdBook;
  } catch (error) {
    result.errors = error;
  }
  return result;
};

export const getPopularBooks = async (count: number): Promise<Result<Volumes>> => {
  const result: Result<Volumes> = { data: { items: [], totalItems: 0 }, errors: null };
  try {
    const foundBooks: Volume[] = await Book.find().sort({ rating: -1 }).limit(count);
    result.data.items = foundBooks;
    result.data.totalItems = foundBooks.length;
  } catch (error) {
    result.errors = error.errors;
  }
  return result;
};
